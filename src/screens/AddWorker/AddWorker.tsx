import { addWorker } from "../../api/api";
import "./AddWorker.css";
import { useState } from "react";

function AddWorker() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  async function addWorkerCallback() {
    const add = await addWorker(name, password);
    console.log(add);
    setName("");
    setPassword("");
  }

  return (
    <div className="wrapper">
      <div className="main">
        <div className="item-container">
          <label>
            Name:
            <input
              type="text"
              name="name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </label>
        </div>
        <div className="item-container">
          <label>
            Password:
            <input
              type="text"
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </label>
        </div>
        <div className="item-container">
          <button onClick={addWorkerCallback} type="button">
            Click Me
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddWorker;
