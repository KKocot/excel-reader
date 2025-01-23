import { getWeek } from "date-fns";

export interface Item {
  pair: string;
  classes: number[];
  connected: number;
}

export interface ClassesGroupProps {
  Textbox5: string;
  __parsed_extra: any[];
}

export function raportGenarator(jsonResult: ClassesGroupProps[][] | null) {
  if (!jsonResult) return null;
  const sortedList = jsonResult.map((list) => {
    // Get school name
    const title = getTitles(list);
    // First two elements are: School name and line with headers, so we skip them
    const cleanList = list.length > 2 ? getList(list.slice(2)) : [];
    return { title: title, list: cleanList };
  });
  return sortedList;
}

function getTitles(list: ClassesGroupProps[]) {
  // School name is in the first element of the list
  return list[0].Textbox5.split("\r")[0].replace(" / Szkoła Podstawowa", "");
}

function getList(list: ClassesGroupProps[]) {
  const clearList = list
    // Move all data to from __parsed_extra to main object
    .map((e) => ({
      week: e.Textbox5,
      date: e.__parsed_extra?.[0] || null,
      pair: e.__parsed_extra?.[1] || null,
      class: e.__parsed_extra?.[2] || null,
    }))
    // Filter out all empty elements
    .filter((e) => e.class)
    // Connect pairs with classes weeks
    .reduce((acc: Item[], curr) => {
      const weekNumber = getWeek(curr.date);
      const existingPair = acc.find((item) => item.pair === curr.pair);

      if (existingPair) {
        if (!existingPair.classes.includes(weekNumber)) {
          existingPair.classes.push(weekNumber);
        }
      } else {
        acc.push({
          pair: curr.pair,
          connected: Number(getWeek(curr.pair.split(" ").pop())),
          classes: [weekNumber],
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
        check: item.classes.includes(week),
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
