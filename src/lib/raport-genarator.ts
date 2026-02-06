import { getWeek } from "date-fns";
import { ClassesGroupProps, ClassStatus, Item } from "@/types";
import { is_string, is_class_status, get_status_color } from "@/lib/utils";

/**
 * Main report generator function
 * Transforms raw CSV data into structured report grouped by school
 * Deduplicates schools if same school appears in multiple CSV files
 */
export function raportGenarator(jsonResult: ClassesGroupProps[][] | null) {
  if (!jsonResult) return null;
  const sortedList = jsonResult.map((list) => {
    // Get school name
    const title = getTitles(list);
    // First two elements are: School name and line with headers, so we skip them
    const cleanList = list.length > 2 ? getList(list.slice(2)) : [];
    return { title, list: cleanList };
  });

  // Deduplicate schools by title using Map for O(1) lookup
  const schools_map = new Map<string, { title: string; list: ReturnType<typeof getList> }>();

  sortedList.forEach((current) => {
    const existing = schools_map.get(current.title);

    if (existing) {
      // Merge lists: combine pairs, merge weekItems for duplicate pairs
      const pairs_map = new Map<string, ReturnType<typeof getList>[number]>();

      // Index existing pairs
      existing.list.forEach((pair) => {
        pairs_map.set(pair.pair, pair);
      });

      // Merge or add new pairs
      current.list.forEach((new_pair) => {
        const existing_pair = pairs_map.get(new_pair.pair);

        if (existing_pair) {
          // Merge fullWeeks immutably
          const existing_weeks_set = new Set(existing_pair.fullWeeks.map((w) => w.week));
          const new_weeks = new_pair.fullWeeks.filter((w) => !existing_weeks_set.has(w.week));
          pairs_map.set(new_pair.pair, {
            ...existing_pair,
            fullWeeks: [...existing_pair.fullWeeks, ...new_weeks]
          });
        } else {
          // Add new pair
          pairs_map.set(new_pair.pair, new_pair);
        }
      });

      // Update existing school with merged pairs
      schools_map.set(current.title, {
        ...existing,
        list: Array.from(pairs_map.values())
      });
    } else {
      // Add new school
      schools_map.set(current.title, current);
    }
  });

  // Sort fullWeeks for all pairs after all merges are done
  const deduplicated = Array.from(schools_map.values());
  deduplicated.forEach((school) => {
    school.list.forEach((pair) => {
      pair.fullWeeks.sort((a, b) => a.week - b.week);
    });
  });

  return deduplicated;
}

function getTitles(list: ClassesGroupProps[]) {
  // School name is in the first element of the list
  return list[0].Textbox5.split("\r")[0].replace(" / Szkoła Podstawowa", "");
}

function getList(list: ClassesGroupProps[]) {
  const clearList = list
    // Move all data to from __parsed_extra to main object
    .map((e) => {
      const date_value = e.__parsed_extra?.[0];
      const pair_value = e.__parsed_extra?.[1];
      const class_value = e.__parsed_extra?.[2];

      return {
        week: e.Textbox5,
        date: is_string(date_value) ? date_value : null,
        pair: is_string(pair_value) ? pair_value : null,
        class: is_class_status(class_value) ? class_value : null,
      };
    })
    // Filter out all empty elements
    .filter(
      (
        e
      ): e is {
        week: string;
        date: string | null;
        pair: string;
        class: ClassStatus;
      } => !!e.class && !!e.pair
    )
    // Connect pairs with classes weeks
    .reduce((acc: Item[], curr) => {
      const weekNumber = getWeek(curr.date || new Date());
      const existingPair = acc.find((item) => item.pair === curr.pair);

      if (existingPair) {
        if (!existingPair.classes.some((c) => c.week === weekNumber)) {
          existingPair.classes.push({
            week: weekNumber,
            status: curr.class,
            status_color: get_status_color(curr.class),
          });
        }
      } else {
        const lastPart = curr.pair.split(" ").pop();
        acc.push({
          pair: curr.pair,
          connected: Number(getWeek(lastPart || new Date())),
          classes: [
            {
              week: weekNumber,
              status: curr.class,
              status_color: get_status_color(curr.class),
            },
          ],
        });
      }
      return acc;
    }, [])
    .map((item) => ({
      // Clean up pair name
      pair: item.pair.split(" ").slice(0, 3).join(" "),
      // Get all weeks for the pair
      fullWeeks: getWeeksArray(item).map((week) => ({
        week,
        check: item.classes.some((c) => c.week === week),
        status: item.classes.find((c) => c.week === week)?.status || null,
        status_color:
          item.classes.find((c) => c.week === week)?.status_color || "red",
      })),
      connected: item.connected,
    }));

  return clearList;
}

function getWeeksArray(item: Item) {
  // Get current week number and subtract 1 to ignore current week in the list
  const currentWeek = getWeek(new Date()) - 1;
  // Add 2 to connected week to ignore 2 weeks after connection
  const connectedDate = item.connected + 2;
  const lastYear = Array.from(
    { length: 52 - connectedDate + 1 },
    (_, i) => connectedDate + i
  );
  const currentYear = Array.from({ length: currentWeek }, (_, i) => i + 1);

  // Add 1 to today to check if the pair is connected this week
  return item.connected <= currentWeek + 1
    ? Array.from(
        { length: currentWeek - connectedDate + 1 },
        (_, i) => connectedDate + i
      )
    : [...lastYear, ...currentYear];
}
