import "./Table.css";

type DataType = string | number | boolean;

interface TableProps {
  title: string;
  headers: string[];
  data: Array<Array<DataType>>;
}

export default function Table({ headers, data, title }: TableProps) {
  function generateHeaders() {
    return headers.map((header) => {
      return <th>{header}</th>;
    });
  }

  function generateRows() {
    const tableData = data.map((row) => {
      return row.map((data) => {
        return <td>{data}</td>;
      });
    });
    return tableData.map((tableData) => {
      return <tr>{tableData}</tr>;
    });
  }

  return (
    <div className="tableParent">
      <h1>{title}</h1>
      <table>
        <thead>
          <tr>{generateHeaders()}</tr>
        </thead>
        <tbody>{generateRows()}</tbody>
      </table>
      <div className="tableFooter"></div>
    </div>
  );
}