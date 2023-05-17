import { useLocation, useNavigate } from "react-router";
import { addWorker, deleteWorker, updateWorker, user } from "../../api/api";
import "./AddWorker.css";
import { useState } from "react";

function AddWorker() {
  const user = useLocation().state as user | undefined;
  const navigation = useNavigate();
  const [name, setName] = useState(user?.name ?? "");
  const [password, setPassword] = useState("");

  async function addWorkerCallback() {
    await addWorker(name, password);
    setName("");
    setPassword("");
    navigation("/app/workers");
  }

  async function updateWorkerCallback() {
    if (!user) return;
    await updateWorker({ ...user, name, password: password || undefined });
    navigation("/app/workers");
  }

  async function deleteWorkerCallback() {
    if (!user) return;
    await deleteWorker({ ...user });
    navigation("/app/workers");
  }

  return (
    <div className="wrapper">
      <div className="main">
        <div className="item-container">
          <label>
            Name:
            <input
              value={name}
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
          <button
            className="button"
            onClick={user ? updateWorkerCallback : addWorkerCallback}
            type="button"
          >
            {user ? "Update" : "Add"}
          </button>
          {user ? (
            <button
              className="buttonDelete"
              onClick={deleteWorkerCallback}
              type="button"
            >
              Delete
            </button>
          ) : undefined}
        </div>
      </div>
    </div>
  );
}

export default AddWorker;
