import React from "react";
import "./Cards.css";

interface Props {
  data: any[];
}

export default function Card(props: Props) {
  function MapData() {
    return props.data.slice(1, props.data.length - 1).map((item: any) => (
      <p className="card-elements">
        <em>{item}</em>
      </p>
    ));
  }
  const title = props.data[0];
  return (
    <div className="card-container">
      <h1>{title}</h1>
      {MapData()}
    </div>
  );
}
