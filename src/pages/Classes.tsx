import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import Papa from "papaparse";
import { getWeek } from "date-fns";
import ClassesGroup from "@/components/classes-group";
import { Accordion, AccordionContent } from "@/components/ui/accordion";
import { getSchool } from "@/lib/utils";
import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { raportGenarator } from "@/lib/raport-genarator";
import { Button } from "@/components/ui/button";
import DownloadClassesRaport from "@/components/download-classes-raport";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ParsedResult {
  data: any[];
  errors: any[];
  meta: any;
}

export interface Sort {
  red: boolean;
  green: boolean;
  yellow: boolean;
}

const Classes = () => {
  const [jsonResult, setJsonResult] = useState<any[]>([]);
  const [showDates, setShowDates] = useState<boolean>(false);
  const [sort, setSort] = useState<Sort>({
    red: true,
    green: true,
    yellow: true,
  });
  const today = getWeek(new Date());
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files ? event.target.files : null;
    if (file) {
      Array.from(file).forEach((f) => {
        Papa.parse<ParsedResult>(f, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setJsonResult((prev) => [...prev, result.data]);
          },
        });
      });
    }
  };
  const raport = raportGenarator(getSchool(jsonResult));

  return (
    <div className="p-4 flex flex-col items-center gap-8 ">
      {raport ? <DownloadClassesRaport raport={raport} /> : null}
      <h1 className="text-4xl font-bold">Zajecia</h1>
      <h2 className="text-xl font-bold">Obecny tydzien {today}</h2>
      <Input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="w-1/2"
        multiple
      />
      <a href="https://www.epochconverter.com/pl/tygodni/2025" target="_blank">
        <Button>Kalendarz tygodni</Button>
      </a>
      <Card className="p-4 bg-card border-border shadow-sm hover:shadow-md transition-shadow duration-300">
        <h2 className="text-center text-xl m-4 font-bold">
          Filtruj według statusu
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => setSort((prev) => ({ ...prev, green: !prev.green }))}
            variant={sort.green ? "default" : "outline"}
            className={`relative ${
              sort.green
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
            }`}
          >
            Zielony
            {sort.green ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <div className="mr-2 h-4 w-4" />
            )}
          </Button>
          <Button
            onClick={() =>
              setSort((prev) => ({ ...prev, yellow: !prev.yellow }))
            }
            variant={sort.yellow ? "default" : "outline"}
            className={`relative ${
              sort.yellow
                ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                : "border-yellow-600 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950"
            }`}
          >
            Żółty
            {sort.yellow ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <div className="mr-2 h-4 w-4" />
            )}
          </Button>
          <Button
            onClick={() => setSort((prev) => ({ ...prev, red: !prev.red }))}
            variant={sort.red ? "default" : "outline"}
            className={`relative ${
              sort.red
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
            }`}
          >
            Czerwony
            {sort.red ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <div className="mr-2 h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="mt-4">
          <h2 className="text-center text-xl m-4 font-bold">Inne opcje</h2>
          <Button
            onClick={() => setShowDates(!showDates)}
            variant={showDates ? "default" : "outline"}
            className={`relative ${
              showDates
                ? "bg-slate-600 hover:bg-slate-700 text-white"
                : "border-slate-600 text-slate-600 hover:bg-red-50 dark:hover:bg-red-950"
            }`}
          >
            Pokaz daty
            {sort.red ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <div className="mr-2 h-4 w-4" />
            )}
          </Button>
        </div>
      </Card>
      <Accordion type="multiple" className="container">
        {raport
          ? raport.map((list, index) => (
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
                    showDates={showDates}
                  />
                </AccordionContent>
              </AccordionItem>
            ))
          : null}
      </Accordion>
    </div>
  );
};

export default Classes;
