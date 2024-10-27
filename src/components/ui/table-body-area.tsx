import { Item } from "@/App";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import clsx from "clsx";

const TableBodyArea = ({ data }: { data: Item[] }) => {
  return (
    <TableBody>
      {data.map((element, index) => {
        return (
          <TableRow key={index}>
            <TableCell>
              {element.school.replace("Szkoła Podstawowa", "SP")}
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
              {element.recrutmentStatus}
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
              {element.dezactivationReason}
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
