import { useEffect, useState } from "react";
import "./SubTask.css";
import { useNavigate } from "react-router";
import Calendar from "react-calendar";
import {
  WorkerToWorkTypeMapped,
  Milliseconds,
  getTimeSpentByWorkers,
} from "../../api/api";
import STTable from "../../components/STTable/STTable";

export default function SubTask() {
  const [workersWithSTTime, setWorkersWithSTTime] =
    useState<WorkerToWorkTypeMapped>({});
  const [startSTTimeStamp, setStartSTTimeStamp] = useState(
    new Date(Date.now() - Milliseconds.MONTH)
  );
  const [endSTTimeStamp, setEndSTTimeStamp] = useState(new Date());
  async function getSTTimeSpent() {
    const workers = await getTimeSpentByWorkers(
      startSTTimeStamp,
      endSTTimeStamp
    );
    setWorkersWithSTTime(workers);
  }
  useEffect(() => {
    getSTTimeSpent();
  });

  function generateSTTable() {
    return Object.entries(workersWithSTTime).map(([worker, workTypes]) => {
      return (
        <STTable
          title={worker}
          headers={Object.keys(workTypes)}
          data={[Object.values(workTypes)]}
          STAmount={[Object.values(workTypes)]}
          STType={[Object.values(workTypes)]}
        />
      );
    });
  }

  function onSTStartTimestampChange(date: string) {
    setStartSTTimeStamp(new Date(date));
    getSTTimeSpent();
  }

  function onSTEndTimestampChange(date: string) {
    setEndSTTimeStamp(new Date(date));
    getSTTimeSpent();
  }

  return (
    <div className="STContainer">
      <div className="STCalendarContainer">
        <div>
          <label>Start Date</label>
          <Calendar
            onChange={(value) => onSTStartTimestampChange(value!.toString())}
            maxDate={endSTTimeStamp}
            value={startSTTimeStamp}
          />
        </div>
        <div>
          <label>End Date</label>
          <Calendar
            onChange={(value) => onSTEndTimestampChange(value!.toString())}
            minDate={startSTTimeStamp}
            value={endSTTimeStamp}
          />
        </div>
      </div>
      <div className="showSTResultsTable">{generateSTTable()}</div>
    </div>
  );
}
