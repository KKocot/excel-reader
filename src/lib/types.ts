export interface IExcelData {
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
  __EMPTY_15: Item["recrutmentStatus"];
  __EMPTY_16: string;
  __EMPTY_17: string;
  __EMPTY_18: string;
  __EMPTY_19: string;
  __EMPTY_20: Item["roleStatus"];
  __EMPTY_21: Item["dezactivationReason"];
  __EMPTY_22: string;
  __EMPTY_23: Item["inductionDate"];
  __EMPTY_24: string;
  __EMPTY_25: string;
  __EMPTY_26: Item["participate"];
  __EMPTY_27: Item["feedback"];
  __EMPTY_28: Item["otherRole"];
  __EMPTY_29: Item["contract"];
  __EMPTY_30: Item["contractSent"];
  __EMPTY_31: Item["constractSigned"];
  __EMPTY_32: Item["crimeRecord"];
  __EMPTY_33: string;
  __EMPTY_34: string;
  __rowNum__: number;
}
export interface Kwap {
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
  id: string;
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
    | "Przypisany do rekrutera";
  roleStatus: "brak" | "aktywna" | "nieaktywna";
  dezactivationReason:
    | "Wypowiedzenie umowy bez okresu wypowiedzenia"
    | "Odbiór uprawnień po decyzji wolontariusza"
    | "Obiór uprawnień z pozostałych powodów"
    | "Brak warunków nadania roli"
    | "";
  inductionDate: string;
  participate:
    | ""
    | "ob_pelna"
    | "nieobecny"
    | "ob_czesciowo"
    | "brak_oznaczenia";
  feedback: "" | "zielone" | "czerwone" | "zolte" | "brak_oznaczenia";
  otherRole: "" | "tak" | "nie";
  contract: "brak" | "podpisana";
  contractSent: string;
  constractSigned: string;
  crimeRecord: "tak" | "nie";
}
