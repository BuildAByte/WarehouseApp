import { useEffect, useState } from "react";

import { getAllPickingsAdmin, getWorks, user, work } from "../../api/api";
import "./Works.css";
import { useNavigate } from "react-router-dom";
import Card from "../../components/CardV2/Card";

export default function Works() {
  const [works, setWorks] = useState<work[]>([]);
  const { admin: isAdmin } = JSON.parse(localStorage.getItem("user")!) as user;

  const navigate = useNavigate();
  useEffect(() => {
    async function get() {
      const fetchWorks = isAdmin ? getAllPickingsAdmin : getWorks;
      const result = await fetchWorks();
      setWorks(result);
    }
    get();
  });
  function mapLatestWork() {
    return works.map((work) => {
      const { work_type, start_timestamp, end_timestamp, worker_name } =
        work as work & {
          worker_name: string;
        };
      const [startDate, startTime] = start_timestamp.split("T");
      const [endDate, endTime] = end_timestamp?.split("T") ?? [
        "Unfinished",
        "Unfinished",
      ];
      let baseData = {
        "Work Type": work_type,
        "Start Date": startDate,
        "Start Time": startTime,
        "End Date": endDate,
        "End Time": endTime,
      };

      const data = isAdmin
        ? {
            ...{ "Worker Name": worker_name },
            ...baseData,
          }
        : baseData;

      return (
        <Card
          color={work.end_timestamp ? "green" : "red"}
          data={data}
          onClick={() => {
            navigate(`/app/add-work`, { state: work });
          }}
        />
      );
    });
  }

  return (
    <div className="container">
      <button className="addWorkBtn" onClick={() => navigate("/app/add-work")}>
        Add Work
      </button>

      <div className="table-container">{mapLatestWork()}</div>
    </div>
  );
}
