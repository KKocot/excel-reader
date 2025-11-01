import ClassesGroupItem from "./classes-group-item";
import { Sort } from "@/pages/Classes";
import { useMemo } from "react";
import { WeekItem } from "./classes-group";

const ClassesGroupPairs = ({
  item,
  sort,
  showDates,
}: {
  item: WeekItem[];
  sort: Sort;
  showDates: boolean;
}) => {
  const filteredItems = useMemo(
    () =>
      item.filter((week) => {
        if (sort.red && week.status_color === "red") return true;
        if (sort.green && week.status_color === "green") return true;
        if (sort.yellow && week.status_color === "yellow") return true;
        return false;
      }),
    [item, sort]
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
