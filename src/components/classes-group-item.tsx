import { createDate } from "@/lib/utils";
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
      className={`text-xs w-28 flex flex-col whitespace-nowrap ${getStatusColor(
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

function getStatusColor(color: string) {
  switch (color) {
    case "green":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30";
    case "yellow":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30";
    case "red":
      return "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30";
    default:
      return "bg-muted text-muted-foreground";
  }
}
