import { ListProps, Sort } from "@/types";
import ClassesGroupPairs from "./ClassesGroupPairs";
import { Badge } from "./ui/badge";

const ClassesGroup = ({
  schoolList,
  sort,
  showDates,
  week_from,
  week_to,
}: {
  schoolList: ListProps;
  sort: Sort;
  showDates: boolean;
  week_from: number | null;
  week_to: number | null;
}) => {
  return (
    <div>
      <h1 className="font-bold">{schoolList.title}</h1>
      {schoolList.list.map((item, index) => (
        <div
          key={`${item.pair}-${schoolList.title}`}
          className="border-b border-border hover:bg-muted/40 transition-all duration-200 hover:shadow-sm group flex animate-fade-in-row"
          style={{
            animationDelay: `${index * 0.05}s`,
          }}
        >
          <div className="flex">
            <div className="sticky left-0 z-10 bg-card group-hover:bg-muted/40 p-4 border-r border-border backdrop-blur-sm transition-colors duration-200 w-[200px]">
              <div className="font-medium text-foreground text-sm group-hover:text-primary transition-colors duration-200">
                {item.pair}
              </div>
            </div>
            <div className="text-center border-r border-border w-12 flex items-center justify-center">
              <Badge
                variant="outline"
                className="font-mono text-xs hover:scale-110 transition-transform duration-200"
              >
                {item.connected}
              </Badge>
            </div>
          </div>
          <ClassesGroupPairs
            item={item.fullWeeks}
            sort={sort}
            showDates={showDates}
            week_from={week_from}
            week_to={week_to}
          />
        </div>
      ))}
    </div>
  );
};

export default ClassesGroup;
