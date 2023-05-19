import "./Card.css";

interface Props {
  data: Record<string, any>;
  title: string;
  onClick?: () => void;
  color: "red" | "green";
}

function AddWorker(props: Props) {
  function MapData() {
    return Object.keys(props.data).map((key: string) => (
      <p className="card-elements">
        <h2>{key}:</h2> <h2>{props.data[key]}</h2>
      </p>
    ));
  }

  const style: Record<string, React.CSSProperties> = {
    wrapperBase: {
      display: "flex",
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",

      height: "10%",
      borderRadius: "20px",
      margin: "20px",
    },
    wrapperRed: { border: "5px solid red" },
    wrapperGreen: { border: "5px solid #4caf50" },
  };
  const chosenStyle =
    props.color === "red"
      ? { ...style.wrapperBase, ...style.wrapperRed }
      : { ...style.wrapperBase, ...style.wrapperGreen };
  return (
    <div onClick={props.onClick} className="wrapperCard" style={chosenStyle}>
      {MapData()}
    </div>
  );
}

export default AddWorker;
