import { Item } from "@/lib/types";
import { FC } from "react";
import * as XLSX from "xlsx-js-style";
import { Button } from "./ui/button";

interface DownloadButtonProps {
  kwap: Item[];
  title: string;
}

const DownloadButton: FC<DownloadButtonProps> = ({ kwap, title }) => {
  const handleDownloadExcel = () => {
    const workbook = XLSX.utils.book_new();

    const rows = kwap.map((item) => [
      { v: item.school, t: "n" },
      { v: item.id, t: "n" },
      { v: item.name, t: "s" },
      { v: item.surname, t: "s" },
      {
        v: item.recrutmentStatus.replace(
          "Zaproszony na spotkanie",
          "Zaproszony"
        ),
        t: "s",
        s: {
          fill: {
            patternType: "solid",
            fgColor: {
              rgb:
                item.recrutmentStatus === "Zrekrutowany"
                  ? "FF00FF00" // Green
                  : item.recrutmentStatus === "Zaproszony na spotkanie"
                  ? "FFFFFF00" // Yellow
                  : "FF808080", // Gray
            },
          },
        },
      },
      {
        v: item.roleStatus,
        t: "s",
        s: {
          fill: {
            patternType: "solid",
            fgColor: {
              rgb:
                item.roleStatus === "aktywna"
                  ? "FF00FF00" // Green
                  : item.roleStatus === "nieaktywna"
                  ? "FFFF0000" // Red
                  : "FF808080", // Gray
            },
          },
        },
      },
      {
        v: item.dezactivationReason.replace(
          "Brak warunków nadania roli",
          "BWNR"
        ),
        t: "s",
        s: {
          fill: {
            patternType: "solid",
            fgColor: {
              rgb:
                item.dezactivationReason === "Brak warunków nadania roli"
                  ? "FFFF0000" // Red
                  : "FF808080", // Gray
            },
          },
        },
      },
      {
        v: item.inductionDate,
        t: "s",
        s: {
          fill: {
            patternType: "solid",
            fgColor: {
              rgb: item.inductionDate === "" ? "FFFF0000" : "FF00FF00", // Red if empty, Green otherwise
            },
          },
        },
      },
      {
        v: item.participate,
        t: "s",
        s: {
          fill: {
            patternType: "solid",
            fgColor: {
              rgb:
                item.participate === "ob_pelna"
                  ? "FF00FF00" // Green
                  : item.participate === "nieobecny"
                  ? "FFFF0000" // Red
                  : "FF808080", // Gray
            },
          },
        },
      },
      {
        v: item.feedback,
        t: "s",
        s: {
          fill: {
            patternType: "solid",
            fgColor: {
              rgb:
                item.feedback === "czerwone"
                  ? "FFFF0000" // Red
                  : item.feedback === "zielone"
                  ? "FF00FF00" // Green
                  : item.feedback === "zolte"
                  ? "FFFFFF00" // Yellow
                  : "FF808080", // Gray
            },
          },
        },
      },
      {
        v: item.otherRole,
        t: "s",
        s: {
          fill: {
            patternType: "solid",
            fgColor: {
              rgb: item.otherRole === "tak" ? "FF00FF00" : "FF808080", // Green if "tak", Gray otherwise
            },
          },
        },
      },
      {
        v: item.contract,
        t: "s",
        s: {
          fill: {
            patternType: "solid",
            fgColor: {
              rgb:
                item.contract === "podpisana"
                  ? "FF00FF00" // Green
                  : item.contract === "brak"
                  ? "FFFF0000" // Red
                  : "FF808080", // Gray
            },
          },
        },
      },
      {
        v: item.contractSent,
        t: "s",
        s: {
          fill: {
            patternType: "solid",
            fgColor: {
              rgb:
                item.contractSent === ""
                  ? "FF808080" // Gray
                  : item.constractSigned !== ""
                  ? "FF00FF00" // Green
                  : "FFFFFF00", // Yellow
            },
          },
        },
      },
      {
        v: item.constractSigned,
        t: "s",
        s: {
          fill: {
            patternType: "solid",
            fgColor: {
              rgb: item.constractSigned === "" ? "FFFF0000" : "FF00FF00", // Red if empty, Green otherwise
            },
          },
        },
      },
      {
        v: item.crimeRecord,
        t: "s",
        s: {
          fill: {
            patternType: "solid",
            fgColor: {
              rgb:
                item.crimeRecord === "tak"
                  ? "FF00FF00" // Green
                  : item.crimeRecord === "nie"
                  ? "FFFF0000" // Red
                  : "FF808080", // Gray
            },
          },
        },
      },
    ]);

    // Add header row with styles
    const header = [
      { v: "Szkola", t: "s", s: { font: { bold: true } } },
      { v: "ID", t: "s", s: { font: { bold: true } } },
      { v: "Imie", t: "s", s: { font: { bold: true } } },
      { v: "Nazwisko", t: "s", s: { font: { bold: true } } },
      { v: "Status Rekrutacji", t: "s", s: { font: { bold: true } } },
      { v: "Status Roli", t: "s", s: { font: { bold: true } } },
      { v: "Powod dezaktywacji konta", t: "s", s: { font: { bold: true } } },
      { v: "Data wdrozenia", t: "s", s: { font: { bold: true } } },
      { v: "Obecnosc na wdrozeniu", t: "s", s: { font: { bold: true } } },
      { v: "Swiatlo z wdrozenia", t: "s", s: { font: { bold: true } } },
      { v: "Rekomendacje do innej roli", t: "s", s: { font: { bold: true } } },
      { v: "Umowa", t: "s", s: { font: { bold: true } } },
      { v: "Data wyslania umowy", t: "s", s: { font: { bold: true } } },
      { v: "Data podpisania umowy", t: "s", s: { font: { bold: true } } },
      { v: "KRK", t: "s", s: { font: { bold: true } } },
    ];

    const data = [header, ...rows];

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Kwap1 Data");

    XLSX.writeFile(workbook, "kwap1_data.xlsx");
  };

  return (
    <div>
      <Button variant="secondary" onClick={handleDownloadExcel}>
        {title}
      </Button>
    </div>
  );
};

export default DownloadButton;
