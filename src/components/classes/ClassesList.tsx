import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ClassesGroup from "@/components/ClassesGroup";
import { ListProps, Sort } from "@/types";

interface ClassesListProps {
  raport: ListProps[] | null;
  sort: Sort;
  show_dates: boolean;
  week_from: number | null;
  week_to: number | null;
}

/**
 * Displays processed CSV data as accordion list grouped by school
 * Each school contains pairs with weekly class status
 */
const ClassesList = ({
  raport,
  sort,
  show_dates,
  week_from,
  week_to,
}: ClassesListProps) => {
  if (!raport) {
    return null;
  }

  return (
    <Accordion type="multiple" className="container">
      {raport.map((list, index) => (
        <AccordionItem value={`title-${index}`} key={`title-${index}`}>
          <AccordionTrigger>
            <ul className="text-xl w-full">
              <li className="flex justify-between" key={index}>
                <span key={list.title}>{list.title}</span>
              </li>
            </ul>
          </AccordionTrigger>
          <AccordionContent className="overflow-x-scroll">
            <ClassesGroup
              schoolList={list}
              key={list.title}
              sort={sort}
              showDates={show_dates}
              week_from={week_from}
              week_to={week_to}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ClassesList;
