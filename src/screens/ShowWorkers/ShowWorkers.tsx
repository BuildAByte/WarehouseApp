import { useEffect, useState } from "react";
import { getWorkers, user } from "../../api/api";
import "./ShowWorkers.css";
import { useNavigate } from "react-router-dom";
import Card from "../../components/CardV2/Card";

export default function ShowWorkers() {
  const [workers, setWorkers] = useState<user[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getAllWorkers = async () => {
      const workerResult = await getWorkers();
      setWorkers(workerResult);
    };
    getAllWorkers();
    const userString = localStorage.getItem("user");
    const parse = JSON.parse(userString!) as user;
    setIsAdmin(parse.admin);
  });
  function mapUsers() {
    return workers.map(({ id, name }, index) => (
      <Card
        color="green"
        key={id}
        title={name}
        onClick={() => navigate("/app/add-worker", { state: workers[index] })}
        data={{ Id: id, Name: name }}
      />
    ));
  }

  const adminButtons: Array<{ route: string; title: string }> = [
    {
      route: "/app/add-worker",
      title: "Add Worker",
    },
    { route: "/app/assignWork", title: "Assign Work" },
  ];

  function mapAdminButtons() {
    return adminButtons.map(({ route, title }) => (
      <button onClick={() => navigate(route)} key={route}>
        {title}
      </button>
    ));
  }

  return (
    <div className="container">
      {mapUsers()}
      <div className="showWorkersAdminButtonContainer">{mapAdminButtons()}</div>
    </div>
  );
}
