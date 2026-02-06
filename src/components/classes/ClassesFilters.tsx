import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, ArrowRight, Calendar } from "lucide-react";
import { Sort } from "@/types";
import { Link } from "react-router-dom";
import { format, addDays } from "date-fns";
import { createDate } from "@/lib/utils";

const WEEK_FILTER_ALL = "all";

interface ClassesFiltersProps {
  sort: Sort;
  show_dates: boolean;
  week_from: number | null;
  week_to: number | null;
  on_toggle_green: () => void;
  on_toggle_yellow: () => void;
  on_toggle_red: () => void;
  on_toggle_show_dates: () => void;
  on_week_from_change: (value: number | null) => void;
  on_week_to_change: (value: number | null) => void;
}

/**
 * Filter controls for Classes view
 * Color status filters (green/yellow/red) and show dates option
 */
const ClassesFilters = ({
  sort,
  show_dates,
  week_from,
  week_to,
  on_toggle_green,
  on_toggle_yellow,
  on_toggle_red,
  on_toggle_show_dates,
  on_week_from_change,
  on_week_to_change,
}: ClassesFiltersProps) => {
  const handle_week_from_change = (value: string) => {
    if (value === WEEK_FILTER_ALL) {
      on_week_from_change(null);
      return;
    }
    const num = Number(value);
    if (!Number.isNaN(num)) on_week_from_change(num);
  };

  const handle_week_to_change = (value: string) => {
    if (value === WEEK_FILTER_ALL) {
      on_week_to_change(null);
      return;
    }
    const num = Number(value);
    if (!Number.isNaN(num)) on_week_to_change(num);
  };

  const week_options = Array.from({ length: 53 }, (_, i) => i + 1);

  const format_week_option = (week: number): string => {
    const dates = createDate(week);
    const parts = dates.start.split(".");

    if (parts.length !== 3) {
      return `Tyg. ${week}`;
    }

    const day = Number(parts[0]);
    const month = Number(parts[1]);
    const year = Number(parts[2]);

    if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
      return `Tyg. ${week}`;
    }

    const start_date = new Date(year, month - 1, day);

    if (Number.isNaN(start_date.getTime())) {
      return `Tyg. ${week}`;
    }

    const end_date = addDays(start_date, 6);
    const start_formatted = format(start_date, "dd.MM");
    const end_formatted = format(end_date, "dd.MM");
    return `Tyg. ${week} (${start_formatted} - ${end_formatted})`;
  };

  return (
    <Card className="p-4 bg-card border-border shadow-sm hover:shadow-md transition-shadow duration-300 col-span-1 items-center flex flex-col gap-4">
      <h2 className="text-center text-xl m-4 font-bold">
        Filtruj według statusu
      </h2>
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={on_toggle_green}
          variant={sort.green ? "default" : "outline"}
        >
          <span className="h-3 w-3 rounded-full bg-green-500" />
          Zielony
          {sort.green && <Check className="h-4 w-4" />}
        </Button>
        <Button
          onClick={on_toggle_yellow}
          variant={sort.yellow ? "default" : "outline"}
        >
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          Żółty
          {sort.yellow && <Check className="h-4 w-4" />}
        </Button>
        <Button
          onClick={on_toggle_red}
          variant={sort.red ? "default" : "outline"}
        >
          <span className="h-3 w-3 rounded-full bg-red-500" />
          Czerwony
          {sort.red && <Check className="h-4 w-4" />}
        </Button>
      </div>
      <div className="mt-6 border-t border-border pt-4">
        <h2 className="text-center text-xl mb-4 font-bold">Inne opcje</h2>

        <div className="flex justify-center mb-4">
          <Button
            onClick={on_toggle_show_dates}
            variant={show_dates ? "default" : "outline"}
            className={`relative ${
              show_dates
                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                : "border-primary text-primary hover:bg-muted"
            }`}
          >
            Pokaż daty
            {show_dates ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <div className="mr-2 h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-sm font-semibold text-center">Zakres tygodni</h3>
            <Link to="/classes/calendar">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Calendar className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-1 space-y-2">
              <Label htmlFor="week-from" className="text-sm font-medium">
                Od tygodnia
              </Label>
              <Select
                value={week_from?.toString() ?? WEEK_FILTER_ALL}
                onValueChange={handle_week_from_change}
              >
                <SelectTrigger id="week-from">
                  <SelectValue placeholder="Wszystkie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={WEEK_FILTER_ALL}>Wszystkie</SelectItem>
                  {week_options.map((week) => (
                    <SelectItem key={week} value={week.toString()}>
                      {format_week_option(week)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-center pb-2">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="flex-1 space-y-2">
              <Label htmlFor="week-to" className="text-sm font-medium">
                Do tygodnia
              </Label>
              <Select
                value={week_to?.toString() ?? WEEK_FILTER_ALL}
                onValueChange={handle_week_to_change}
              >
                <SelectTrigger id="week-to">
                  <SelectValue placeholder="Wszystkie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={WEEK_FILTER_ALL}>Wszystkie</SelectItem>
                  {week_options.map((week) => (
                    <SelectItem key={week} value={week.toString()}>
                      {format_week_option(week)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {week_from !== null && week_to !== null && week_from > week_to && (
            <p className="text-destructive text-xs text-center mt-2">
              "Od tygodnia" nie może być większe niż "Do tygodnia"
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ClassesFilters;
