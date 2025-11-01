import { ClassesGroupProps } from "@/lib/raport-genarator";
import { Button } from "./ui/button";

const DownloadButtonClasses = ({
  label,
  data: _data,
}: {
  label: string;
  data: ClassesGroupProps[][] | null;
}) => {
  return (
    <div className="my-5">
      <Button variant="secondary">{label}</Button>
    </div>
  );
};
export default DownloadButtonClasses;
