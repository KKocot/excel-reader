import clsx from "clsx";
import { Button } from "./ui/button";
import { createDate } from "@/lib/utils";

const ClassesGroupItem = ({
  week,
}: {
  week: { week: number; check: boolean };
}) => {
  const { start, end } = createDate(week.week);

  return (
    <Button
      key={week.week}
      className={clsx("flex flex-col h-fit rounded-none p-1 gap-1", {
        "bg-green-500": week.check,
        "bg-red-500": !week.check,
      })}
    >
      <span>{start}</span>
      <span>{end}</span>
      <span>Tydzien: {week.week}</span>
    </Button>
  );
};
export default ClassesGroupItem;
