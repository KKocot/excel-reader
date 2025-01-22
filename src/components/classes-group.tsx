import ClassesGroupPairs from "./classes-group-pairs";

interface ListProps {
  title: string;
  list: {
    connected: number;
    pair: string;
    fullWeeks: { week: number; check: boolean }[];
  }[];
}
const ClassesGroup = ({ schoolList }: { schoolList: ListProps }) => {
  return (
    <div>
      <h1 className="font-bold">{schoolList.title}</h1>
      {schoolList.list.map((item) => (
        <div key={item.pair}>
          <div>{`${item.pair} (${item.connected})`}</div>
          <ClassesGroupPairs item={item.fullWeeks} />
        </div>
      ))}
    </div>
  );
};

export default ClassesGroup;
