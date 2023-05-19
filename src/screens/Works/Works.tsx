import { useEffect, useState } from "react";

import { getActiveWork, getWorks, work } from "../../api/api";
import "./Works.css";
import { useNavigate } from "react-router-dom";
import Card from "../../components/CardV2/Card";

export default function Works() {
  const [works, setWorks] = useState<work[]>([]);
  const [workDisplayed, setWorkDisplayed] = useState<work[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    async function get() {
      const result = await getWorks();
      if (!!result.length) setWorks(result);
    }
    async function getData() {
      setWorkDisplayed(await getActiveWork());
    }
    getData();
    get();
  });
  function mapLatestWork() {
    return workDisplayed.map((work) => (
      <Card
        color="red"
        data={work}
        title={`${work.id}`}
        onClick={() => {
          navigate(`/app/add-work`, { state: work });
        }}
      />
    ));
  }

  return (
    <div className="container">
      {workDisplayed.length ? undefined : (
        <button
          className="addWorkBtn"
          onClick={() => navigate("/app/add-work")}
        >
          Add Work
        </button>
      )}

      <div className="table-container">{mapLatestWork()}</div>
    </div>
  );
}
