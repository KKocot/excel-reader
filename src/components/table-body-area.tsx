import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Item } from "@/lib/types";
import clsx from "clsx";

const TableBodyArea = ({ data }: { data: Item[] }) => {
  return (
    <TableBody>
      {data.map((element, index) => {
        return (
          <TableRow key={index}>
            <TableCell>
              {element.school
                .replace(" Dowolna Szkoła Podstawowa", "DSP")
                .replace(" Szkoła Podstawowa ", "SP")
                .replace("nr ", "")
                .replace("Częstochowa ", "Cz")
                .replace("Dąbrowa Górnicza ", "DB")
                .replace("Katowice ", "Kat")
                .replace("Jaworzno ", "JW")
                .replace("Siemianowice Śląskie ", "Siem")
                .replace("Gliwice ", "Gl")
                .replace("Rybnik ", "Rb")
                .replace("Sosnowiec ", "So")
                .replace("Tarnowskie Góry ", "TG")
                .replace("Bielsko-Biała ", "BB")
                .replace("Tychy ", "Tch")}
            </TableCell>
            <TableCell>{element.id}</TableCell>
            <TableCell>{element.name}</TableCell>
            <TableCell>{element.surname}</TableCell>
            <TableCell
              className={clsx("bg-gray-400", {
                "bg-green-400": element.recrutmentStatus === "Zrekrutowany",
                "bg-yellow-400":
                  element.recrutmentStatus === "Zaproszony na spotkanie",
              })}
            >
              {element.recrutmentStatus.replace(
                "Zaproszony na spotkanie",
                "Zaproszony"
              )}
            </TableCell>
            <TableCell
              className={clsx("bg-gray-400", {
                "bg-green-400": element.roleStatus === "aktywna",
                "bg-red-400": element.roleStatus === "nieaktywna",
              })}
            >
              {element.roleStatus}
            </TableCell>
            <TableCell
              className={clsx("bg-gray-400", {
                "bg-red-400":
                  element.dezactivationReason === "Brak warunków nadania roli",
              })}
            >
              {element.dezactivationReason.replace(
                "Brak warunków nadania roli",
                "BWNR"
              )}
            </TableCell>
            <TableCell
              className={clsx("bg-green-400", {
                "bg-red-400": element.inductionDate === "",
              })}
            >
              {element.inductionDate}
            </TableCell>
            <TableCell
              className={clsx("bg-gray-400", {
                "bg-green-400": element.participate === "ob_pelna",
                "bg-red-400": element.participate === "nieobecny",
              })}
            >
              {element.participate}
            </TableCell>
            <TableCell
              className={clsx("bg-gray-400", {
                "bg-red-400": element.feedback === "czerwone",
                "bg-green-400": element.feedback === "zielone",
                "bg-yellow-400": element.feedback === "zolte",
              })}
            >
              {element.feedback}
            </TableCell>
            <TableCell
              className={clsx("bg-gray-400", {
                "bg-green-400": element.otherRole === "tak",
              })}
            >
              {element.otherRole}
            </TableCell>
            <TableCell
              className={clsx({
                "bg-green-400": element.contract === "podpisana",
                "bg-red-400": element.contract === "brak",
              })}
            >
              {element.contract}
            </TableCell>
            <TableCell
              className={clsx("bg-yellow-400", {
                "bg-gray-400": element.contractSent === "",
                "bg-green-400": element.constractSigned !== "",
              })}
            >
              {element.contractSent}
            </TableCell>
            <TableCell
              className={clsx("bg-green-400", {
                "bg-red-400": element.constractSigned === "",
              })}
            >
              {element.constractSigned}
            </TableCell>
            <TableCell
              className={clsx({
                "bg-green-400": element.crimeRecord === "tak",
                "bg-red-400": element.crimeRecord === "nie",
              })}
            >
              {element.crimeRecord}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default TableBodyArea;
