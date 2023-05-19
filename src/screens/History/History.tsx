import { useEffect, useState } from "react";
import { getAllPickingsAdmin, getWorks, user, work } from "../../api/api";
import Card from "../../components/CardV2/Card";

export default function History() {
  const [works, setWorks] = useState<work[]>([]);
  const currentUser = JSON.parse(localStorage.getItem("user")!) as user;

  useEffect(() => {
    async function workerState() {
      if (currentUser.admin === true) {
        setWorks(await getAllPickingsAdmin());
      } else {
        const a = await getWorks();
        setWorks(a);
      }
    }
    workerState();
  });

  function mapWorks() {
    return works.map((work) => (
      <Card
        color="green"
        data={work}
        title={`${work.work_type} ${work.start_timestamp}`}
      />
    ));
  }

  return <div>{mapWorks()}</div>;
}
