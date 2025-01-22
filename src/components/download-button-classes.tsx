import { ClassesGroupProps } from "@/lib/raport-genarator";
import { Button } from "./ui/button";

const DownloadButtonClasses = ({
  label,
  data,
}: {
  label: string;
  data: ClassesGroupProps[][] | null;
}) => {
  console.log(data);
  return (
    <div className="my-5">
      <Button variant="secondary">{label}</Button>
    </div>
  );
};
export default DownloadButtonClasses;
