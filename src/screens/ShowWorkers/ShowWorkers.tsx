import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { getWorkers, user } from "../../api/api";
import "./ShowWorkers.css";
import { useNavigate } from "react-router-dom";

export default function ShowWorkers() {
  const [workers, setWorkers] = useState<user[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getAllWorkers = async () => {
      const workerResult = await getWorkers();
      if (!!workerResult.length) {
        setWorkers(workerResult);
      }
    };
    getAllWorkers();
    const userString = localStorage.getItem("user");
    const parse = JSON.parse(userString!) as user;
    setIsAdmin(parse.admin);
  });
  function mapUsers() {
    return workers.map((user) => (
      <div key={user.id}>
        <p>{user.name}</p>
      </div>
    ));
  }
  return (
    <div className="container">
      {mapUsers()}
      {isAdmin ? (
        <button
          className="addWorkerBtn"
          onClick={() => navigate("/app/add-worker")}
        >
          Add Worker
        </button>
      ) : undefined}
    </div>
  );
}
