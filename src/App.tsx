import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, ChangeEvent, FormEvent } from "react";
import * as XLSX from "xlsx";
import TableBodyArea from "./components/ui/table-body-area";

interface IExcelData {
  "Lp.": string;
  __EMPTY: string;
  __EMPTY_1: string;
  __EMPTY_2: string;
  __EMPTY_3: string;
  __EMPTY_4: string;
  __EMPTY_5: string;
  __EMPTY_6: string;
  __EMPTY_7: string;
  __EMPTY_8: string;
  __EMPTY_9: string;
  __EMPTY_11: string;
  __EMPTY_12: string;
  __EMPTY_13: string;
  __EMPTY_14: string;
  __EMPTY_15: string;
  __EMPTY_16: string;
  __EMPTY_17: string;
  __EMPTY_18: string;
  __EMPTY_19: string;
  __EMPTY_20: string;
  __EMPTY_21: string;
  __EMPTY_22: string;
  __EMPTY_23: string;
  __EMPTY_24: string;
  __EMPTY_25: string;
  __EMPTY_26: string;
  __EMPTY_27: string;
  __EMPTY_28: string;
  __EMPTY_29: string;
  __EMPTY_30: string;
  __EMPTY_31: string;
  __EMPTY_32: string;
  __EMPTY_33: string;
  __EMPTY_34: string;
  __rowNum__: number;
}
interface Kwap {
  kwap1: Item[];
  kwap2: Item[];
  kwap3: Item[];
  kwap4: Item[];
  kwap5: Item[];
  kwap6: Item[];
  kwap7: Item[];
  kwap8: Item[];
  kwap9: Item[];
  kwap10: Item[];
  kwap11: Item[];
}
export interface Item {
  school: string;
  id: number;
  name: string;
  surname: string;
  recrutmentStatus:
    | ""
    | "Nowy"
    | "Odrzucony"
    | "Przypisany do rekrutera"
    | "Zaproszony na spotkanie"
    | "Zrekrutowany"
    | "Zrezygnował"
    | "Zrekrutowany"
    | "Zrezygnował"
    | "Odrzucony"
    | "Przypisany do rekrutera"
    | string;
  roleStatus: "brak" | "aktywna" | "nieaktywna" | string;
  dezactivationReason:
    | "Wypowiedzenie umowy bez okresu wypowiedzenia"
    | "Odbiór uprawnień po decyzji wolontariusza"
    | "Obiór uprawnień z pozostałych powodów"
    | "Brak warunków nadania roli"
    | ""
    | string;
  inductionDate: string;
  participate:
    | ""
    | "ob_pelna"
    | "nieobecny"
    | "ob_czesciowo"
    | "brak_oznaczenia"
    | string;
  feedback: "" | "zielone" | "czerwone" | "zolte" | "brak_oznaczenia" | string;
  otherRole: "" | "tak" | "nie" | string;
  contract: "brak" | "podpisana" | string;
  contractSent: string;
  constractSigned: string;
  crimeRecord: "tak" | "nie" | string;
}
const kwap_list = {
  kwap1: [
    "Częstochowa / Szkoła Podstawowa nr 12",
    "Częstochowa / Szkoła Podstawowa nr 20",
  ],
  kwap2: [
    "Dąbrowa Górnicza / Szkoła Podstawowa nr 10",
    "Katowice / Szkoła Podstawowa nr 22",
    "Katowice / Szkoła Podstawowa nr 58",
  ],
  kwap3: [
    "Jaworzno / Szkoła Podstawowa nr 18",
    "Siemianowice Śląskie / Szkoła Podstawowa nr 4",
  ],
  kwap4: [
    "Gliwice / Szkoła Podstawowa nr 28",
    "Gliwice/ Szkoła Podstawowa nr 11",
  ],
  kwap5: ["Katowice / Szkoła Podstawowa nr 11"],
  kwap6: [
    "Katowice / Szkoła Podstawowa nr 12",
    "Katowice / Szkoła Podstawowa nr 2",
  ],
  kwap7: [
    "Katowice / Szkoła Podstawowa nr 36",
    "Katowice / Szkoła Podstawowa nr 47",
  ],
  kwap8: ["Rybnik / Szkoła Podstawowa nr 3", "Radlin/ Szkoła Podstawowa nr 4"],
  kwap9: [
    "Sosnowiec / Szkoła Podstawowa nr 3",
    "Sosnowiec / Szkoła Podstawowa nr 6",
    "Sosnowiec / Szkoła Podstawowa nr 10",
  ],
  kwap10: [
    "Tarnowskie Góry / Szkoła Podstawowa nr 3",
    "Tarnowskie Góry / Szkoła Podstawowa nr 8",
    "Tarnowskie Góry / Szkoła Podstawowa nr 12",
    "Tarnowskie Góry / Szkoła Podstawowa nr 10",
  ],
  kwap11: [
    "Tychy / Szkoła Podstawowa nr 17",
    "Bielsko-Biała / Dowolna Szkoła Podstawowa",
  ],
};

function getSchoolName(data: Item[], kwap: string[]) {
  const school = data.filter((item) => kwap.includes(item.school));

  return school;
}
function App() {
  const [excelFile, setExcelFile] = useState<ArrayBuffer | null>(null);
  const [typeError, setTypeError] = useState<string | null>(null);
  const [excelData, setExcelData] = useState<Item[] | null>(null);

  const [kwapTeam, setKwapTeam] = useState<Item[] | null>(null);
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          if (e.target) {
            setExcelFile(e.target.result as ArrayBuffer);
          }
        };
      } else {
        setTypeError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };

  const handleFileSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data: IExcelData[] = XLSX.utils.sheet_to_json(worksheet);
      const items: Item[] = data.map((item) => {
        return {
          school: item.__EMPTY_1,
          id: Number(item.__EMPTY_7),
          name: item.__EMPTY_8,
          surname: item.__EMPTY_9,
          recrutmentStatus: item.__EMPTY_15,
          roleStatus: item.__EMPTY_20,
          dezactivationReason: item.__EMPTY_21,
          inductionDate: item.__EMPTY_23,
          participate: item.__EMPTY_26,
          feedback: item.__EMPTY_27,
          otherRole: item.__EMPTY_28,
          contract: item.__EMPTY_29,
          contractSent: item.__EMPTY_30,
          constractSigned: item.__EMPTY_31,
          crimeRecord: item.__EMPTY_32,
        };
      });
      setExcelData(items);
    }
  };

  const short_list = excelData?.filter(
    (item) =>
      (item.recrutmentStatus === "Zaproszony na spotkanie" ||
        item.recrutmentStatus === "Zrekrutowany" ||
        item.recrutmentStatus === "") &&
      (item.dezactivationReason === "Brak warunków nadania roli" ||
        item.dezactivationReason === "")
  );
  const kwaps =
    short_list && excelData
      ? {
          kwap1: getSchoolName(short_list, kwap_list.kwap1),
          kwap2: getSchoolName(short_list, kwap_list.kwap2),
          kwap3: getSchoolName(short_list, kwap_list.kwap3),
          kwap4: getSchoolName(short_list, kwap_list.kwap4),
          kwap5: getSchoolName(short_list, kwap_list.kwap5),
          kwap6: getSchoolName(short_list, kwap_list.kwap6),
          kwap7: getSchoolName(short_list, kwap_list.kwap7),
          kwap8: getSchoolName(short_list, kwap_list.kwap8),
          kwap9: getSchoolName(short_list, kwap_list.kwap9),
          kwap10: getSchoolName(short_list, kwap_list.kwap10),
          kwap11: getSchoolName(short_list, kwap_list.kwap11),
        }
      : null;
  return (
    <div className="p-4 flex flex-col items-center gap-8 w-fit min-w-full">
      <h1 className="text-4xl font-bold">File reader</h1>
      <form className="flex" onSubmit={handleFileSubmit}>
        <Input type="file" required onChange={handleFile} />
        <Button type="submit">UPLOAD</Button>
        {typeError && <div role="alert">{typeError}</div>}
      </form>
      <div>
        {kwaps ? (
          <div className="flex gap-1">
            <Button onClick={() => setKwapTeam(kwaps.kwap1)}>KWAP 1</Button>
            <Button onClick={() => setKwapTeam(kwaps.kwap2)}>KWAP 2</Button>
            <Button onClick={() => setKwapTeam(kwaps.kwap3)}>KWAP 3</Button>
            <Button onClick={() => setKwapTeam(kwaps.kwap4)}>KWAP 4</Button>
            <Button onClick={() => setKwapTeam(kwaps.kwap5)}>KWAP 5</Button>
            <Button onClick={() => setKwapTeam(kwaps.kwap6)}>KWAP 6</Button>
            <Button onClick={() => setKwapTeam(kwaps.kwap7)}>KWAP 7</Button>
            <Button onClick={() => setKwapTeam(kwaps.kwap8)}>KWAP 8</Button>
            <Button onClick={() => setKwapTeam(kwaps.kwap9)}>KWAP 9</Button>
            <Button onClick={() => setKwapTeam(kwaps.kwap10)}>KWAP 10</Button>
            <Button onClick={() => setKwapTeam(kwaps.kwap11)}>KWAP 11</Button>
          </div>
        ) : null}
        {excelData && kwapTeam ? (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{excelData[0].school}</TableHead>
                  <TableHead>id</TableHead>
                  <TableHead>{excelData[0].name}</TableHead>
                  <TableHead>{excelData[0].surname}</TableHead>
                  <TableHead>{excelData[0].recrutmentStatus}</TableHead>
                  <TableHead>{excelData[0].roleStatus}</TableHead>
                  <TableHead>{excelData[0].dezactivationReason}</TableHead>
                  <TableHead>{excelData[0].inductionDate}</TableHead>
                  <TableHead>{excelData[0].participate}</TableHead>
                  <TableHead>{excelData[0].feedback}</TableHead>
                  <TableHead>{excelData[0].otherRole}</TableHead>
                  <TableHead>{excelData[0].contract}</TableHead>
                  <TableHead>{excelData[0].contractSent}</TableHead>
                  <TableHead>{excelData[0].constractSigned}</TableHead>
                  <TableHead>{excelData[0].crimeRecord}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBodyArea data={kwapTeam} />
            </Table>
          </div>
        ) : (
          <div>No File is uploaded yet!</div>
        )}
      </div>
    </div>
  );
}

export default App;
