import { useEffect, useState } from "react";
import {
  Milliseconds,
  WorkerToWorkTypeMapped,
  downloadCsv,
  downloadSubtaskCsv,
  getTimeSpentByWorkers,
  uploadPickingData,
} from "../../api/api";
import Table from "../../components/Table/Table";
import "./ShowResults.css";
import "react-calendar/dist/Calendar.css";
import download from "downloadjs";
import Calendar from "react-calendar";

export default function ShowResults() {
  const [fileContent, setUploadFile] = useState<string | undefined>(undefined);
  const [workersWithTime, setWorkersWithTime] =
    useState<WorkerToWorkTypeMapped>({});
  const [startTimestamp, setStartTimestamp] = useState(
    new Date(Date.now() - Milliseconds.MONTH)
  );
  const [endTimestamp, setEndTimestamp] = useState(new Date());

  async function getTimeSpent() {
    const workers = await getTimeSpentByWorkers(startTimestamp, endTimestamp);
    setWorkersWithTime(workers);
  }

  useEffect(() => {
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

  function onStartTimestampChange(date: string) {
    setStartTimestamp(new Date(date));
    getTimeSpent();
  }

  function onEndTimestampChange(date: string) {
    setEndTimestamp(new Date(date));
    getTimeSpent();
  }

  async function showFile(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result;
      setUploadFile(text?.toString());
    };

    const file = e.target?.files?.[0];
    if (!file) return;
    reader.readAsText(file);
  }

  return (
    <div className="showResultsTable">
      <div className="showResultsButtonContainer">
        <div className="showResultsCalendarContainer">
          <div className="showResultsCalendarItem">
            <label>Start Date</label>
            <Calendar
              onChange={(value) => onStartTimestampChange(value!.toString())}
              maxDate={endTimestamp}
              value={startTimestamp}
            />
          </div>
          <div>
            <label>End Date</label>
            <Calendar
              onChange={(value) => onEndTimestampChange(value!.toString())}
              minDate={startTimestamp}
              value={endTimestamp}
            />
          </div>
        </div>
        <div className="showResultsButtonContainer">
          <button
            className="resultsButton"
            onClick={async () => {
              const csv = await downloadCsv(startTimestamp, endTimestamp);
              download(csv, "work.csv", "text/csv");
            }}
          >
            Download Work Report
          </button>
          <button
            className="resultsButton"
            onClick={async () => {
              const csv = await downloadSubtaskCsv(
                startTimestamp,
                endTimestamp
              );
              download(csv, "subtasks.csv", "text/csv");
            }}
          >
            Download Sub Task Report
          </button>
          <input type="file" onChange={showFile} name="fileUploaded" />
          <button
            className="resultsButton"
            onClick={async () => {
              if (!fileContent) alert("Please select a file before uploading!");
              await uploadPickingData(fileContent!);
            }}
          >
            Upload SoftOne Picking Data
          </button>
        </div>
      </div>
      <div className="showResultsTableContainer">{generateTable()}</div>
    </div>
  );
}
