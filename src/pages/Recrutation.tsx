import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, ChangeEvent, FormEvent } from "react";
import * as XLSX from "xlsx";
import TableBodyArea from "../components/table-body-area";
import { IExcelData, Item } from "../lib/types";
import { getSchoolName } from "../lib/utils";
import { kwap_list } from "../lib/assets";
import DownloadButtonRcrutationRaport from "../components/download-button";

function Recrutation() {
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
      const items: Item[] = data.slice(1).map((item) => {
        return {
          school: item.__EMPTY_1,
          id: item.__EMPTY_7,
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
  const kwaps = short_list
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
        kwap12: getSchoolName(short_list, kwap_list.kwap12),
        kwap13: getSchoolName(short_list, kwap_list.kwap13),
        kwap14: getSchoolName(short_list, kwap_list.kwap14),
      }
    : null;
  return (
    <div className="p-4 flex flex-col items-center gap-8 w-fit min-w-full">
      <h1 className="text-4xl font-bold">Rekrutacja</h1>
      <form className="flex" onSubmit={handleFileSubmit}>
        <Input type="file" required onChange={handleFile} />
        <Button type="submit">Przetworz</Button>
        {typeError && <div role="alert">{typeError}</div>}
      </form>
      {short_list ? (
        <DownloadButtonRcrutationRaport
          kwap={short_list}
          title="Pobierz wszystkich"
        />
      ) : null}

      <div>
        {kwaps ? (
          <div>
            <div>
              <div className="text-xl font-bold">KWAP Slask</div>
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
                <Button onClick={() => setKwapTeam(kwaps.kwap10)}>
                  KWAP 10
                </Button>
                <Button onClick={() => setKwapTeam(kwaps.kwap11)}>
                  KWAP 11
                </Button>
              </div>
            </div>
            <div>
              <div className="text-xl font-bold">KWAP Opolskie</div>
              <div className="flex gap-1">
                <Button onClick={() => setKwapTeam(kwaps.kwap12)}>
                  KWAP 12
                </Button>
                <Button onClick={() => setKwapTeam(kwaps.kwap13)}>
                  KWAP 13
                </Button>
                <Button onClick={() => setKwapTeam(kwaps.kwap14)}>
                  KWAP 14
                </Button>
              </div>
            </div>{" "}
          </div>
        ) : null}
        {kwapTeam ? (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Szkola</TableHead>
                  <TableHead>id</TableHead>
                  <TableHead>Imie</TableHead>
                  <TableHead>Nazwisko</TableHead>
                  <TableHead>Status Rekrutacji</TableHead>
                  <TableHead>Status roli</TableHead>
                  <TableHead>Powod dezaktywacji roli</TableHead>
                  <TableHead>Termin wdrozenia</TableHead>
                  <TableHead>Uczestnictwo we wdrozeniu</TableHead>
                  <TableHead>Swiatlo z wrdozenia</TableHead>
                  <TableHead>Rekomendacje do innej roli</TableHead>
                  <TableHead>Umowa</TableHead>
                  <TableHead>Data wyslania umowy</TableHead>
                  <TableHead>Data podpisania umowy</TableHead>
                  <TableHead>Zaswiadczenie KRK</TableHead>
                </TableRow>
              </TableHeader>
              <TableBodyArea data={kwapTeam} />
            </Table>
          </div>
        ) : (
          <>
            <div>Brak plikow!</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Recrutation;
