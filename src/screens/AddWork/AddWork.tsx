import {
  WorkType,
  createWork,
  deleteWork,
  getSubTasks,
  getWorkTypes,
  updateWork,
  work,
} from "../../api/api";
import "./AddWork.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddWork() {
  const activeWork = useLocation().state ?? undefined;
  const [work] = useState<work | undefined>(activeWork);
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [subtask, setSubtask] = useState<string>("");
  const [subtaskAmount, setSubtaskAmount] = useState<number>(0);
  const [workTypes, setWorkTypes] = useState<string[]>([]);
  const [workType, setWorkType] = useState<string>("picking");
  const navigate = useNavigate();
  useEffect(() => {
    async function workTypes() {
      setWorkTypes(await getWorkTypes());
    }

    async function subtasks() {
      setSubtasks(await getSubTasks(work?.work_type ?? WorkType.PICKING));
    }
    workTypes();
    subtasks();
  });
  async function addWorkCallback() {
    await createWork(workType);
    navigate("/app/works");
  }
  function mapWorkTypes() {
    return workTypes.map((type) => {
      return (
        <option value={type} key={type}>
          {type}
        </option>
      );
    });
  }

  async function deleteWorkCallback() {
    if (!work?.id) return console.error("No work id");
    await deleteWork(work.id);
    navigate("/app/works");
  }

  async function finishWork() {
    await updateWork(work?.id ?? 0, subtask, subtaskAmount);
    navigate("/app/works");
  }

  function mapSubtasks() {
    const options = subtasks.map((subtask) => {
      return (
        <option value={subtask} key={subtask}>
          {subtask}
        </option>
      );
    });
    return (
      <div className="addWorkInputs">
        <label>Choose a subtask:</label>
        <select
          name="subtask"
          id="subtasks"
          onChange={(event) => {
            setSubtask(event.target.value);
          }}
        >
          <option value="" selected={true}>
            Select Subtask
          </option>
          {options}
        </select>
      </div>
    );
  }

  return (
    <div className="wrapperAddWork">
      {work ? (
        <div>
          {mapSubtasks()}
          <label>
            Amount:
            <input
              value={subtaskAmount}
              type="number"
              onChange={(event) => {
                setSubtaskAmount(parseInt(event.target.value ?? 0));
              }}
            />
          </label>
          <button
            disabled={
              subtasks.length && (!subtask || !subtaskAmount) ? true : false
            }
            onClick={finishWork}
            className="btnFinishWork"
          >
            Finish Work
          </button>
          <button
            className="buttonDelete"
            onClick={deleteWorkCallback}
            type="button"
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="addWorkInputs">
          <label>Choose a work:</label>

          <select
            name="work"
            id="worktypes"
            onChange={(event) => {
              setWorkType(event.target.value);
            }}
          >
            <option value="" selected={true}>
              Select Work Type
            </option>
            {mapWorkTypes()}
          </select>
          <div className="item-container">
            <button onClick={addWorkCallback} type="button">
              Declare work
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddWork;
