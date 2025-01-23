import ClassesGroupItem from "./classes-group-tem";

const ClassesGroupPairs = ({
  item,
}: {
  item: {
    week: number;
    check: boolean;
  }[];
}) => {
  return (
    <div className="flex">
      {item.map((week) => (
        <ClassesGroupItem week={week} />
      ))}
    </div>
  );
};

export default ClassesGroupPairs;
