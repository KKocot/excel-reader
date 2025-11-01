import { getWeek } from "date-fns";

export type StatusColor = "red" | "green" | "yellow";
export interface Item {
  pair: string;
  classes: { week: number; status: ClassStatus; status_color: StatusColor }[];
  connected: number;
}

export interface ClassesGroupProps {
  Textbox5: string;
  __parsed_extra: unknown[];
}

export function raportGenarator(jsonResult: ClassesGroupProps[][] | null) {
  if (!jsonResult) return null;
  const sortedList = jsonResult.map((list) => {
    // Get school name
    const title = getTitles(list);
    // First two elements are: School name and line with headers, so we skip them
    const cleanList = list.length > 2 ? getList(list.slice(2)) : [];
    return { title, list: cleanList };
  });
  return sortedList;
}

function getTitles(list: ClassesGroupProps[]) {
  // School name is in the first element of the list
  return list[0].Textbox5.split("\r")[0].replace(" / Szkoła Podstawowa", "");
}
export type ClassStatus =
  | "spotkanie_do_akceptacji"
  | "spotkanie_zaakceptowane"
  | "odwolal_wolontariusz"
  | "wydarzenie_do_akceptacji"
  | "odwolalo_dziecko"
  | "wydarzenie_zaakceptowane"
  | "brak_zajec"
  | "odrabianie_zajec_zaakceptowane"
  | "odrabianie_zajec_do_akceptacji"
  | null;

const getColorStatus = (status: ClassStatus) => {
  switch (status) {
    case "spotkanie_do_akceptacji":
    case "spotkanie_zaakceptowane":
    case "wydarzenie_do_akceptacji":
    case "wydarzenie_zaakceptowane":
    case "odrabianie_zajec_zaakceptowane":
    case "odrabianie_zajec_do_akceptacji":
      return "green";
    case "odwolal_wolontariusz":
    case "odwolalo_dziecko":
      return "yellow";
    case "brak_zajec":
      return "red";
    default:
      return "red";
  }
};
function getList(list: ClassesGroupProps[]) {
  const clearList = list
    // Move all data to from __parsed_extra to main object
    .map((e) => ({
      week: e.Textbox5,
      date: (e.__parsed_extra?.[0] as string) || null,
      pair: (e.__parsed_extra?.[1] as string) || null,
      class: (e.__parsed_extra?.[2] as ClassStatus) || null,
    }))
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
            status_color: getColorStatus(curr.class),
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
              status_color: getColorStatus(curr.class),
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
