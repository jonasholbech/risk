import React from "react";

export default function Map(props) {
  return (
    <svg
      enable_background="new 0 0 1000 589"
      height="589px"
      style={{ strokeLinejoin: "round", stroke: "#000", fill: "none" }}
      viewBox="0 0 1000 589"
      width="1000px"
      id="svg"
    >
      {props.lands.map(land => (
        <path {...land} />
      ))}
    </svg>
  );
}
