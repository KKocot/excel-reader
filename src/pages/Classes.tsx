import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import Papa from "papaparse";
import { getWeek } from "date-fns";
import ClassesGroup from "@/components/classes-group";
import { Accordion, AccordionContent } from "@/components/ui/accordion";
import { kwap_list } from "@/lib/assets";
import { getSchool } from "@/lib/utils";
import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { raportGenarator } from "@/lib/raport-genarator";
import { Button } from "@/components/ui/button";

interface ParsedResult {
  data: any[];
  errors: any[];
  meta: any;
}

const Classes = () => {
  const [jsonResult, setJsonResult] = useState<any[]>([]);
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
  const sortKwaps = Object.values(kwap_list).map((e) =>
    raportGenarator(getSchool(jsonResult, e))
  );

  return (
    <div className="p-4 flex flex-col items-center gap-8 ">
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
      <Accordion type="multiple" className="container">
        {sortKwaps
          ? sortKwaps.map((list, index) => {
              return list && list?.length > 0 ? (
                <AccordionItem value={`title-${index}`} key={`title-${index}`}>
                  <AccordionTrigger>
                    <ul className="text-xl w-full">
                      <li className="flex justify-between" key={index}>
                        {list?.map((e) => (
                          <span key={e.title}>{e.title}</span>
                        ))}
                      </li>
                    </ul>
                  </AccordionTrigger>
                  <AccordionContent className="overflow-x-scroll">
                    {list.map((e) => (
                      <ClassesGroup schoolList={e} key={e.title} />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ) : null;
            })
          : null}
      </Accordion>
    </div>
  );
};

export default Classes;
