import { getWeek } from "date-fns";
import ClassesGroupPairs from "./classes-group-pairs";

interface Item {
  pair: string;
  classes: number[];
  connected: number;
}
export interface ClassesGroupProps {
  Textbox5: string;
  __parsed_extra: any[];
}

const ClassesGroup = ({ jsonResult }: { jsonResult: ClassesGroupProps[] }) => {
  const createdObjects = jsonResult.map((e) => ({
    week: e.Textbox5,
    date: e.__parsed_extra ? e.__parsed_extra[0] : null,
    pair: e.__parsed_extra ? e.__parsed_extra[1] : null,
    class: e.__parsed_extra ? e.__parsed_extra[2] : null,
  }));

  const sortedByPairs = createdObjects.filter(
    (e) => e.class && e.class !== "karta"
  );

  const transformedData = sortedByPairs.reduce((acc: Item[], curr) => {
    const existingPair = acc.find((item) => item.pair === curr.pair);
    if (existingPair) {
      existingPair.classes.push(getWeek(curr.date));
    } else {
      acc.push({
        pair: curr.pair,
        connected: Number(
          getWeek(curr.pair.split(" ")[curr.pair.split(" ").length - 1]) + 1
        ),
        classes: [getWeek(curr.date)],
      });
    }
    return acc;
  }, []);

  return (
    <div>
      <h1 className="font-bold">{jsonResult[0].Textbox5.split("\r")[0]}</h1>
      {transformedData.map((item, i) => (
        <ClassesGroupPairs item={item} key={i} />
      ))}
    </div>
  );
};

export default ClassesGroup;
