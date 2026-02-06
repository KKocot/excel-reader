import ClassesGroupItem from "./classes-group-item";
import { Sort, WeekItem } from "@/types";
import { useMemo } from "react";

const ClassesGroupPairs = ({
  item,
  sort,
  showDates,
  week_from,
  week_to,
}: {
  item: WeekItem[];
  sort: Sort;
  showDates: boolean;
  week_from: number | null;
  week_to: number | null;
}) => {
  const filteredItems = useMemo(
    () =>
      item.filter((week) => {
        // Color filter
        const color_match =
          (sort.red && week.status_color === "red") ||
          (sort.green && week.status_color === "green") ||
          (sort.yellow && week.status_color === "yellow");

        if (!color_match) return false;

        // Week range filter
        if (week_from !== null && week.week < week_from) return false;
        if (week_to !== null && week.week > week_to) return false;

        return true;
      }),
    [item, sort, week_from, week_to]
  );
  return (
    <div className="flex">
      {filteredItems.map((week) => (
        <ClassesGroupItem week={week} showDates={showDates} key={week.week} />
      ))}
    </div>
  );
};

export default ClassesGroupPairs;
