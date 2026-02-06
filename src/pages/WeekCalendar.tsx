import {
  eachWeekOfInterval,
  startOfYear,
  endOfYear,
  startOfWeek,
  endOfWeek,
  format,
  getWeek,
} from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/**
 * WeekCalendar component
 * Displays all weeks in current year with start/end dates (Monday-Sunday)
 * Highlights current week
 */
const WeekCalendar = () => {
  const current_year = new Date().getFullYear();
  const current_week_number = getWeek(new Date());

  // Generate all weeks in current year
  const year_start = startOfYear(new Date(current_year, 0, 1));
  const year_end = endOfYear(new Date(current_year, 11, 31));
  const weeks_in_year = eachWeekOfInterval(
    { start: year_start, end: year_end },
    { weekStartsOn: 1 }
  );

  // Generate week data: week number, start date, end date
  const week_data = weeks_in_year.map((week_start_date) => {
    const week_number = getWeek(week_start_date);
    const monday = startOfWeek(week_start_date, { weekStartsOn: 1 });
    const sunday = endOfWeek(week_start_date, { weekStartsOn: 1 });

    return {
      week_number,
      start: format(monday, "dd.MM.yyyy"),
      end: format(sunday, "dd.MM.yyyy"),
      is_current: week_number === current_week_number,
    };
  });

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2 text-foreground">
        Kalendarz tygodni {current_year}
      </h1>
      <div className="w-32 h-1 bg-primary mb-6 rounded-md"></div>

      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center font-semibold">
                Numer tygodnia
              </TableHead>
              <TableHead className="text-center font-semibold">
                Data od (poniedziałek)
              </TableHead>
              <TableHead className="text-center font-semibold">
                Data do (niedziela)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {week_data.map((week) => (
              <TableRow
                key={week.week_number}
                className={
                  week.is_current
                    ? "bg-primary/10 font-medium hover:bg-primary/15"
                    : ""
                }
              >
                <TableCell className="text-center">
                  {week.week_number}
                </TableCell>
                <TableCell className="text-center">{week.start}</TableCell>
                <TableCell className="text-center">{week.end}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Aktualny tydzień: {current_week_number}
      </p>
    </div>
  );
};

export default WeekCalendar;
