import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ClassesUploadProps {
  current_week: number;
  on_file_change: (event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * CSV file upload component with current week display
 * Allows multiple CSV file selection from Kwap1 system
 */
const ClassesUpload = ({ current_week, on_file_change }: ClassesUploadProps) => {
  return (
    <div className="col-span-1 items-center flex flex-col gap-4">
      <h2 className="text-xl font-bold">
        Obecny tydzień {current_week}/{new Date().getFullYear()}
      </h2>
      <div className="w-1/2 text-center">
        <Input
          type="file"
          accept=".csv,.xlsx,.xls,.ods"
          onChange={on_file_change}
          multiple
          id="file-upload"
        />
        <Label className="text-center" htmlFor="file-upload">
          Wybierz pliki CSV lub Excel wyeksportowane
        </Label>
      </div>
    </div>
  );
};

export default ClassesUpload;
