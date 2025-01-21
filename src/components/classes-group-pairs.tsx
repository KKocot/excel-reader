import { addDays, endOfWeek, getWeek, startOfWeek } from "date-fns";
import { Button } from "./ui/button";
import { useState } from "react";

const ClassesGroupPairs = ({
  item,
}: {
  item: {
    pair: string;
    classes: number[];
    connected: number;
  };
}) => {
  const today = getWeek(new Date()) - 1;
  const connectedDate = item.connected + 2;
  +2;
  const lastYear = Array.from(
    { length: 52 - connectedDate + 1 },
    (_, i) => connectedDate + i
  );
  const currentYeat = Array.from({ length: today }, (_, i) => i + 1);
  const weeksArray = [...lastYear, ...currentYeat];
  console.log(item.pair, item.connected, [...lastYear, ...currentYeat], today);
  const [missingWeeks, setMissingWeeks] = useState(
    weeksArray.filter((week) => item.classes.includes(week))
  );
  const handleDelete = (week: number) => {
    setMissingWeeks((prev) => prev.filter((w) => w !== week));
  };

  return (
    <div>
      <h2>
        {`${item.pair.split(" ").slice(0, 3).join(" ")} `}
        <span
          className="font-semibold"
          title="tydzien"
        >{`(${item.connected})`}</span>
      </h2>
      <ul>
        {missingWeeks.map((missingWeek) => (
          <li
            key={missingWeek}
            style={{ color: "red" }}
            className="flex items-center gap-1"
          >
            {`${addDays(
              startOfWeek(
                new Date(
                  new Date().setDate(
                    new Date().getDate() + (missingWeek - today) * 7 - 6
                  )
                )
              ),
              1
            ).toLocaleDateString()}  - ${addDays(
              endOfWeek(
                new Date(
                  new Date().setDate(
                    new Date().getDate() + (missingWeek - today) * 7 - 6
                  )
                )
              ),
              1
            ).toLocaleDateString()} (${missingWeek})`}
            <Button
              variant="destructive"
              className=" rounded-full w-1 h-1 p-2"
              onClick={() => handleDelete(missingWeek)}
            >
              X
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassesGroupPairs;
