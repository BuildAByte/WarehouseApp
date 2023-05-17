import "./Card.css";

interface Props {
  data: Record<string, any>;
  title: string;
  onClick?: () => void;
}

function AddWorker(props: Props) {
  function MapData() {
    return Object.keys(props.data).map((key: string) => (
      <p className="card-elements">
        <h2>{key}:</h2> <h2>{props.data[key]}</h2>
      </p>
    ));
  }
  return (
    <div onClick={props.onClick} className="wrapper">
      {MapData()}
    </div>
  );
}

export default AddWorker;
