import { useEffect, useState } from "react";
import { getTimeSpentByWorkers, userWithTime } from "../../api/api";
import Card from "../../components/CardV2/Card";

export default function ShowResults() {
  const [workersWithTime, setWorkersWithTime] = useState<userWithTime[]>([]);
  useEffect(() => {
    const getTimeSpent = async () => {
      const workers = await getTimeSpentByWorkers();
      setWorkersWithTime(workers);
    };
    getTimeSpent();
  });

  function generateTable() {
    return workersWithTime.map(({ name, time }) => {
      return (
        <Card
          color="green"
          data={{ Name: name, "Hours Worked": isNaN(time) ? 0 : time }}
        />
      );
    });
  }
  return <div>{generateTable()}</div>;
}
