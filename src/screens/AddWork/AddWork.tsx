import { createWork, getWorkTypes, updateWork, work } from "../../api/api";
import "./AddWork.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddWork() {
  const activeWork = useLocation().state?.work ?? undefined;
  const [work] = useState<work | undefined>(activeWork);
  const [workTypes, setWorkTypes] = useState<string[]>([]);
  const [workType, setWorkType] = useState<string>("picking");
  const navigate = useNavigate();
  useEffect(() => {
    async function workTypes() {
      setWorkTypes(await getWorkTypes());
    }
    workTypes();
  });
  async function addWorkCallback() {
    const add = await createWork(workType);
    console.log(add);
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

  async function finishWork() {
    await updateWork(activeWork);
    navigate("/app/works");
  }

  return (
    <div className="wrapper">
      <div className="main">
        {work ? (
          <button onClick={finishWork}>Finish Work</button>
        ) : (
          <div>
            <label>Choose a work:</label>

            <select
              name="work"
              id="worktypes"
              onChange={(event) => {
                setWorkType(event.target.value);
              }}
            >
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
    </div>
  );
}

export default AddWork;
