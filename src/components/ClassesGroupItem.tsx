import { createDate, get_status_color_classes } from "@/lib/utils";
import { WeekItem } from "@/types";
import { Badge } from "./ui/badge";

const ClassesGroupItem = ({
  week,
  showDates,
}: {
  week: WeekItem;
  showDates: boolean;
}) => {
  const { start, end } = createDate(week.week);

  return (
    <Badge
      key={week.week}
      variant="outline"
      className={`text-xs w-28 flex flex-col whitespace-nowrap ${get_status_color_classes(
        week.status_color
      )} hover:scale-105 hover:shadow-md transition-all duration-200 cursor-default`}
    >
      <span className="font-bold text-wrap text-center">
        {week.status ? week.status.replace(/_/g, " ") : "Brak"}
      </span>
      {showDates ? (
        <>
          <span>{start}</span>
          <span>{end}</span>
        </>
      ) : null}
      <span>Tydzień: {week.week}</span>
    </Badge>
  );
};
export default ClassesGroupItem;
