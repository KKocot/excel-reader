import { FC } from "react";
import * as XLSX from "xlsx-js-style";
import { Button } from "./ui/button";
import { createDate } from "@/lib/utils";

interface Raport {
  title: string;
  list: {
    pair: string;
    fullWeeks: {
      week: number;
      check: boolean;
    }[];
    connected: number;
  }[];
}

const DownloadClassesRaport: FC<{ raport: (Raport[] | null)[] }> = ({
  raport,
}) => {
  const handleDownloadExcel = () => {
    const workbook = XLSX.utils.book_new();
    const rows = raport.flatMap((e) => {
      return (
        e?.flatMap((el) => {
          return el.list.map((l) => {
            return [
              { v: el.title, t: "s" },
              { v: l.pair, t: "s" },
              { v: l.connected, t: "n" },
              ...l.fullWeeks.map((week) => {
                const dates = createDate(week.week);
                return {
                  v: week.check
                    ? week.week
                    : `${dates.start}-${dates.end} (${week.week})`,
                  t: "s",
                  s: {
                    fill: {
                      patternType: "solid",
                      fgColor: {
                        rgb: week.check ? "FF00FF00" : "FFFF0000",
                      },
                    },
                  },
                };
              }),
            ];
          });
        }) || []
      );
    });
    const header = [
      { v: "Szkola", t: "s", s: { font: { bold: true } } },
      { v: "Para", t: "s", s: { font: { bold: true } } },
      { v: "Tydzien Polaczenia", t: "s", s: { font: { bold: true } } },
      { v: "Karty Sukcesow", t: "s", s: { font: { bold: true } } },
    ];

    const data = [header, ...rows];

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Kwap1 Data");

    XLSX.writeFile(workbook, "kwap1_data.xlsx");
  };

  return (
    <Button
      className="absolute top-10 right-2"
      variant="secondary"
      onClick={handleDownloadExcel}
    >
      Pobierz raport Kart Sukcesow
    </Button>
  );
};

export default DownloadClassesRaport;
