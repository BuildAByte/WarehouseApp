import "./Table.css";

type DataType = string | number | boolean;

interface TableProps {
  title: string;
  headers: string[];
  data: Array<Array<DataType>>;
  onPressRow?: (row: number) => void;
}

export default function Table({
  headers,
  data,
  title,
  onPressRow,
}: TableProps) {
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
    return tableData.map((tableData, index) => {
      return <tr onClick={() => onPressRow?.(index)}>{tableData}</tr>;
    });
  }

  return (
    <div className="tableParent">
      <h1>{title}</h1>
      <table>
        <tr>{generateHeaders()}</tr>
        {generateRows()}
      </table>
      <div className="tableFooter"></div>
    </div>
  );
}
