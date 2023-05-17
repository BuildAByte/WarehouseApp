import "./Card.css";

interface Props {
  data: Record<string, any>;
  title: string;
  onClick?: () => void;
}

function AddWorker(props: Props) {
  function MapData() {
    return Object.keys(props.data)
      .slice(1, props.data.length - 1)
      .map((key: string) => (
        <p className="card-elements">
          <em>{props.data[key]}</em>
        </p>
      ));
  }
  return (
    <div onClick={props.onClick} className="wrapper">
      <h2>{props.title}</h2>
      {MapData()}
    </div>
  );
}

export default AddWorker;
