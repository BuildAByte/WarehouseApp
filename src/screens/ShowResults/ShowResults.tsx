import { useEffect, useState } from "react";
import { WorkerToWorkTypeMapped, getTimeSpentByWorkers } from "../../api/api";
import Table from "../../components/Table/Table";
import "./ShowResults.css";

export default function ShowResults() {
  const [workersWithTime, setWorkersWithTime] =
    useState<WorkerToWorkTypeMapped>({});
  useEffect(() => {
    const getTimeSpent = async () => {
      const workers = await getTimeSpentByWorkers();
      setWorkersWithTime(workers);
    };
    getTimeSpent();
  });

  function generateTable() {
    return Object.entries(workersWithTime).map(([worker, workTypes]) => {
      return (
        <Table
          title={worker}
          headers={Object.keys(workTypes)}
          data={[Object.values(workTypes)]}
        />
      );
    });
  }

  return <div className="showResultsTable">{generateTable()}</div>;
}
