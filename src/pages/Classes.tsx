import { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import Papa from "papaparse";
import { getWeek } from "date-fns";
import ClassesGroup from "@/components/classes-group";
import { Accordion, AccordionContent } from "@/components/ui/accordion";
import { kwap_list } from "@/lib/assets";
import { getSchool } from "@/lib/utils";
import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import DownloadButtonClasses from "@/components/download-button-classes";

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

  const kwaps = jsonResult
    ? [
        getSchool(jsonResult, kwap_list.kwap1),
        getSchool(jsonResult, kwap_list.kwap2),
        getSchool(jsonResult, kwap_list.kwap3),
        getSchool(jsonResult, kwap_list.kwap4),
        getSchool(jsonResult, kwap_list.kwap5),
        getSchool(jsonResult, kwap_list.kwap6),
        getSchool(jsonResult, kwap_list.kwap7),
        getSchool(jsonResult, kwap_list.kwap8),
        getSchool(jsonResult, kwap_list.kwap9),
        getSchool(jsonResult, kwap_list.kwap10),
        getSchool(jsonResult, kwap_list.kwap11),
        getSchool(jsonResult, kwap_list.kwap12),
        getSchool(jsonResult, kwap_list.kwap13),
        getSchool(jsonResult, kwap_list.kwap14),
      ]
    : null;

  return (
    <div className="p-4 flex flex-col items-center gap-8 w-fit min-w-full">
      <h1 className="text-4xl font-bold">Zajecia</h1>
      <h2 className="text-xl font-bold">Obecny tydzien {today}</h2>
      <Input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="w-1/2"
        multiple
      />
      {/* <DownloadButtonClasses
        label="Pobierz wszystkie"
        data={kwaps ? kwaps.flat() : null}
      /> */}
      <Accordion type="multiple" className="w-2/3">
        {kwaps
          ? kwaps.map((list, index) => {
              const title = list.map((e) =>
                e[0].Textbox5.split("\r")[0].replace(" / Szkoła Podstawowa", "")
              );
              return list.length > 0 ? (
                <AccordionItem value={`title-${index}`} key={`title-${index}`}>
                  <AccordionTrigger>
                    <ul className="text-xl">
                      {title.map((e) => (
                        <li key={e}>{e}</li>
                      ))}
                    </ul>
                  </AccordionTrigger>
                  <AccordionContent className="w-full">
                    {list.map((e) => (
                      <ClassesGroup jsonResult={e} key={e[0].Textbox5} />
                    ))}
                    {/* <DownloadButtonClasses
                      label="Pobierz te szkoly"
                      data={list}
                    /> */}
                  </AccordionContent>
                </AccordionItem>
              ) : null;
            })
          : "Brak danych"}
      </Accordion>
    </div>
  );
};

export default Classes;
