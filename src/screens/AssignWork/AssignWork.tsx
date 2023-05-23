import { useEffect, useState } from "react";
import {
  assignWorkToWorker,
  getWorkTypes,
  getWorkers,
  user,
} from "../../api/api";
import "./AssignWork.css";
import { useNavigate } from "react-router";

export default function AssignWork() {
  const [workers, setWorkers] = useState<user[]>([]);
  const [workTypes, setWorkType] = useState<string[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<user | undefined>();
  const [selectedWorkType, setSelectedWorkType] = useState<string>("picking");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      const resultWorkers = await getWorkers();
      const resultWorkTypes = await getWorkTypes();
      setWorkType(resultWorkTypes);
      setWorkers(resultWorkers);
    }
    fetch();
  });
  function generateWorkerOptions() {
    return workers.map(({ name }, index) => {
      return <option value={index}>{name}</option>;
    });
  }

  function generateWorkTypes() {
    return workTypes.map((workType) => {
      return <option value={workType}>{workType}</option>;
    });
  }

  function assignWorker(event: React.ChangeEvent<HTMLSelectElement>) {
    const index = event.target.value as unknown as number;
    const worker = workers[index];
    setSelectedWorker(worker);
  }

  function assignWork(event: React.ChangeEvent<HTMLSelectElement>) {
    const workType = event.target.value;
    setSelectedWorkType(workType);
  }

  async function saveWork() {
    if (!selectedWorker || !selectedWorkType) {
      return alert("Please select a worker and a work type");
    }
    await assignWorkToWorker(selectedWorker!.id, selectedWorkType);
    return navigate("/app/works");
  }

  return (
    <div className="containerAssignWork">
      <div className="inputAssignWork">
        <label>Workers:</label>
        <select name="workers" id="workers" onChange={assignWorker}>
          <option value="" selected={true}>
            Select Worker
          </option>

          {generateWorkerOptions()}
        </select>
      </div>
      <div className="inputAssignWork">
        <label>Work:</label>
        <select name="work" id="work" onChange={assignWork}>
          <option value="" selected={true}>
            Select Work Type
          </option>
          {generateWorkTypes()}
        </select>
      </div>
      <div>
        <button onClick={saveWork}>Save</button>
      </div>
    </div>
  );
}
