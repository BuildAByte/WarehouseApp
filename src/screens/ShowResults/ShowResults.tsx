import { useEffect, useState } from "react";
import {
  WorkerToWorkTypeMapped,
  downloadCsv,
  downloadSubtaskCsv,
  getTimeSpentByWorkers,
} from "../../api/api";
import Table from "../../components/Table/Table";
import "./ShowResults.css";
import download from "downloadjs";

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

  return (
    <div className="showResultsTable">
      <div className="showResultsButtonContainer">
        <button
          onClick={async () => {
            const csv = await downloadCsv();
            download(csv, "work.csv", "text/csv");
          }}
        >
          Download Work Report
        </button>
        <button
          onClick={async () => {
            const csv = await downloadSubtaskCsv();
            download(csv, "subtasks.csv", "text/csv");
          }}
        >
          Download Sub Task Report
        </button>
      </div>

      {generateTable()}
    </div>
  );
}
