import { addDays, endOfWeek, getWeek, startOfWeek } from "date-fns";
import { Button } from "./ui/button";
import clsx from "clsx";

const ClassesGroupPairs = ({
  item,
}: {
  item: {
    week: number;
    check: boolean;
  }[];
}) => {
  const today = getWeek(new Date());
  return (
    <div className="flex">
      {item.map((week) => (
        <Button
          key={week.week}
          className={clsx("flex flex-col h-fit rounded-none p-1 gap-1", {
            "bg-green-500": week.check,
            "bg-red-500": !week.check,
          })}
        >
          <span>
            {addDays(
              startOfWeek(
                new Date(
                  new Date().setDate(
                    new Date().getDate() + (week.week - today) * 7 - 6
                  )
                )
              ),
              1
            ).toLocaleDateString()}
          </span>
          <span>
            {addDays(
              endOfWeek(
                new Date(
                  new Date().setDate(
                    new Date().getDate() + (week.week - today) * 7 - 6
                  )
                )
              ),
              1
            ).toLocaleDateString()}
          </span>
          <span>Tydzien: {week.week}</span>
        </Button>
      ))}
    </div>
  );
};

export default ClassesGroupPairs;
