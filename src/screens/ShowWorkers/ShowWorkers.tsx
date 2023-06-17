import { useEffect, useState } from "react";
import { getWorkers, user } from "../../api/api";
import "./ShowWorkers.css";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table/Table";

export default function ShowWorkers() {
  const [workers, setWorkers] = useState<user[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getAllWorkers = async () => {
      const workerResult = await getWorkers();
      setWorkers(workerResult);
    };
    getAllWorkers();
  });
  function mapUsers() {
    const data = workers.map(({ id, name }) => [id, name]);
    return (
      <Table
        onPressRow={(index) =>
          navigate("/app/add-worker", { state: workers[index] })
        }
        title="Workers"
        headers={["Id", "Name"]}
        data={data}
      />
    );
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
      <button
        className="showWorkersButton"
        onClick={() => navigate(route)}
        key={route}
      >
        {title}
      </button>
    ));
  }

  return (
    <div className="containerShowWorkers">
      {mapUsers()}
      <div className="showWorkersAdminButtonContainer">{mapAdminButtons()}</div>
    </div>
  );
}
