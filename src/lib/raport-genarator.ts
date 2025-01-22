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
    const title = getTitles(list);
    const cleanList = list.length > 2 ? getList(list.slice(2)) : [];
    return { title: title, list: cleanList };
  });
  return sortedList;
}

function getTitles(list: ClassesGroupProps[]) {
  return list[0].Textbox5.split("\r")[0].replace(" / Szkoła Podstawowa", "");
}

function getList(list: ClassesGroupProps[]) {
  const clearList = list
    .map((e) => ({
      week: e.Textbox5,
      date: e.__parsed_extra?.[0] || null,
      pair: e.__parsed_extra?.[1] || null,
      class: e.__parsed_extra?.[2] || null,
    }))
    .filter((e) => e.class)
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
      pair: item.pair.split(" ").slice(0, 3).join(" "),
      fullWeeks: getWeeksArray(item).map((week) => ({
        week,
        check: item.classes.includes(week),
      })),
      connected: item.connected,
    }));

  return clearList;
}

function getWeeksArray(item: Item) {
  const today = getWeek(new Date()) - 1;
  const connectedDate = item.connected + 2;
  const lastYear = Array.from(
    { length: 52 - connectedDate + 1 },
    (_, i) => connectedDate + i
  );
  const currentYear = Array.from({ length: today }, (_, i) => i + 1);

  return item.connected <= today
    ? Array.from(
        { length: today - connectedDate + 1 },
        (_, i) => connectedDate + i
      )
    : [...lastYear, ...currentYear];
}
