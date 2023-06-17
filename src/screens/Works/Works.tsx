import { useEffect, useState } from "react";

import { getAllPickingsAdmin, getWorks, user, work } from "../../api/api";
import "./Works.css";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table/Table";

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
    const data = works.map(({ work_type, start_timestamp, end_timestamp }) => {
      const [startDate, startTime] = start_timestamp.split("T");
      const [endDate, endTime] = end_timestamp?.split("T") ?? [
        "Unfinished",
        "Unfinished",
      ];
      return [
        work_type,
        `${startDate} - ${startTime}`,
        end_timestamp ? `${endDate} - ${endTime}` : "Unfinished",
      ];
    });
    return (
      <Table
        title="Work"
        headers={["Work Type", "Start Timestamp", "End Timestamp"]}
        data={data}
        onPressRow={(index) =>
          navigate("/app/add-work", { state: works[index] })
        }
      />
    );
  }

  return (
    <div className="container">
      <button className="workButton" onClick={() => navigate("/app/add-work")}>
        Add Work
      </button>

      <div className="table-container">{mapLatestWork()}</div>
    </div>
  );
}
