import { addDays, endOfWeek, getWeek, startOfWeek } from "date-fns";

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
  const today = getWeek(new Date()) - 1;
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
      {transformedData.map((item) => (
        <div key={item.pair}>
          <h2>
            {`${item.pair.split(" ").slice(0, 3).join(" ")} `}
            <span className="font-semibold" title="tydzien">{`(${
              item.connected - 1
            })`}</span>
          </h2>
          <ul>
            {Array.from(
              { length: today - item.connected + 1 },
              (_, i) => item.connected + i
            )
              .filter((week) => !item.classes.includes(week))
              .map((missingWeek) => (
                <li key={missingWeek} style={{ color: "red" }}>
                  {`${addDays(
                    startOfWeek(
                      new Date(
                        new Date().setDate(
                          new Date().getDate() + (missingWeek - today) * 7 - 6
                        )
                      )
                    ),
                    1
                  ).toLocaleDateString()}  - ${addDays(
                    endOfWeek(
                      new Date(
                        new Date().setDate(
                          new Date().getDate() + (missingWeek - today) * 7 - 6
                        )
                      )
                    ),
                    1
                  ).toLocaleDateString()} (${missingWeek})`}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ClassesGroup;
