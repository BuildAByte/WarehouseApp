import { useEffect, useState } from "react";
import { getTimeSpentByWorkers, userWithTime } from "../../api/api";
import "./PivotResults.css";
import { useNavigate } from "react-router";

export function PivotResults() {
  const navigate = useNavigate();
  const [tableRow, setTableRow] = useState<userWithTime[]>([]);
  useEffect(() => {
    const getTimeSpent = async () => {
      const workers = await getTimeSpentByWorkers();
      setTableRow(workers);
    };
    getTimeSpent();
  });

  return (
    <div className="containerPR">
      <h1>Click for more details</h1>
      <table>
        <tr>
          <th>Worker ID</th>
          <th>Worker</th>
          <th>Duration (Hours)</th>
        </tr>

        {tableRow.map((row) => {
          return (
            <tr>
              <td
                onClick={() => {
                  navigate(`/app/workers`);
                }}
              >
                {row.id}
              </td>
              <td
                onClick={() => {
                  navigate(`/app/workers`);
                }}
              >
                {row.name}
              </td>

              <td
                onClick={() => {
                  navigate(`/app/time`);
                }}
              >
                {row.time}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
