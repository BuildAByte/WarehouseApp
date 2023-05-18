import "./Cards.css";
type AnyArray = Array<number | string | Date | JSX.Element>;
interface Props {
  data: AnyArray;
  title: string;
}

export default function Card(props: Props) {
  function MapData() {
    return props.data.slice(1, props.data.length).map((item: any) => (
      <p className="card-elements">
        <em>{item}</em>
      </p>
    ));
  }
  return (
    <div className="card-container">
      <h1>{props.title}</h1>
      {MapData()}
    </div>
  );
}
