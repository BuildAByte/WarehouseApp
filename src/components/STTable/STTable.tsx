import "./STTable.css";

type Datatype = string | number | boolean;

interface STTableProps {
  title: string;
  headers: string[];
  STType: Array<Array<Datatype>>;
  STAmount: Array<Array<Datatype>>;
  data: Array<Array<Datatype>>;
}

export default function STTable({
  headers,
  data,
  title,
  STType,
  STAmount,
}: STTableProps) {
  function generateSTHeaders() {
    return headers.map((header) => {
      return <th>{header}</th>;
    });
  }
  function generateSTRows() {
    const tableData = data.map((row) => {
      return row.map((data) => {
        return (
          <div>
            <td>{data}</td>
            <td>{STAmount}</td>
            <td>{STType}</td>
          </div>
        );
      });
    });
    return tableData.map((tableData, index) => {
      return <tr>{tableData}</tr>;
    });
  }
  return (
    <div>
      <h1>{title}</h1>
      <table>
        <tr>{generateSTHeaders()}</tr>
        {generateSTRows()}
      </table>
    </div>
  );
}
