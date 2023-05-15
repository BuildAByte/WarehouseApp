import { useEffect, useState } from "react";

import {
  getLatestWork,
  getWorkTypes,
  getWorkers,
  getWorks,
  user,
  work,
} from "../../api/api";
import "./Works.css";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Cards";

export default function Works() {
  const [works, setWorks] = useState<work[]>([]);
  const [workDisplayed, setWorkDisplayed] = useState<work[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    async function get() {
      setWorks(await getWorks());
    }
    async function getData() {
      setWorkDisplayed(await getLatestWork());
    }
    getData();
    get();
  });
  function mapLatestWork() {
    return workDisplayed.map((work) => (
      <div
        key={work.id}
        className="activeWork"
        onClick={() => {
          navigate("/app/add-work", { state: { work } });
        }}
      >
        <p>{JSON.stringify(work)}</p>
      </div>
    ));
  }

  function mapWorks() {
    return works.map(({ id, work_type, start_timestamp, end_timestamp }) => (
      <Card data={[id, work_type, start_timestamp, end_timestamp]} />
    ));
  }
  return (
    <div className="container">
      {mapLatestWork()}
      <div className="table-container">{mapWorks()}</div>
      {workDisplayed.length ? undefined : (
        <button
          className="addWorkBtn"
          onClick={() => navigate("/app/add-work")}
        >
          Add Work
        </button>
      )}
    </div>
  );
}
