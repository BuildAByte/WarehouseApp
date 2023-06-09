import { useLocation, useNavigate } from "react-router";
import { addWorker, deleteWorker, updateWorker, user } from "../../api/api";
import "./AddWorker.css";
import { useState } from "react";

function AddWorker() {
  const user = useLocation().state as user | undefined;
  const navigation = useNavigate();
  const [softOneId, setSoftOneId] = useState(0);
  const [name, setName] = useState(user?.name ?? "");
  const [password, setPassword] = useState("");

  async function addWorkerCallback() {
    await addWorker(softOneId, name, password);
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
    <div className="mainAddWorker">
      {!user ? (
        <div className="item-container">
          <label>
            Soft One ID:
            <input
              value={softOneId}
              type="text"
              name="softOneId"
              onChange={(event) => {
                setSoftOneId(parseInt(event.target.value));
              }}
            />
          </label>
        </div>
      ) : undefined}
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
          className="addWorkerButton"
          onClick={user ? updateWorkerCallback : addWorkerCallback}
          type="button"
        >
          {user ? "Update" : "Add"}
        </button>
        {user ? (
          <button
            className="addWorkerButtonDelete"
            onClick={deleteWorkerCallback}
            type="button"
          >
            Delete
          </button>
        ) : undefined}
      </div>
    </div>
  );
}

export default AddWorker;
