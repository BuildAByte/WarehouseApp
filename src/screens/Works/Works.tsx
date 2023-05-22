import { useEffect, useState } from "react";

import {
  getActiveWork,
  getAllPickingsAdmin,
  getWorks,
  user,
  work,
} from "../../api/api";
import "./Works.css";
import { useNavigate } from "react-router-dom";
import Card from "../../components/CardV2/Card";

export default function Works() {
  const [works, setWorks] = useState<work[]>([]);
  const { admin: isAdmin } = JSON.parse(localStorage.getItem("user")!) as user;
  const hasUnfinishedWork = () => works.some((work) => !work.end_timestamp);

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
    return works.map((work) => (
      <Card
        color={work.end_timestamp ? "green" : "red"}
        data={work}
        onClick={() => {
          navigate(`/app/add-work`, { state: work });
        }}
      />
    ));
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
