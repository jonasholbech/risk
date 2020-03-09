import React from "react";

export default function Map(props) {
  const colors = {};
  props.players.forEach(player => {
    colors[player.id] = player.color;
  });
  return (
    <svg
      enable_background="new 0 0 1000 589"
      height="589px"
      style={{ strokeLinejoin: "round", stroke: "#000", fill: "none" }}
      viewBox="0 0 1000 589"
      width="1000px"
      id="map"
    >
      {props.lands.map(land => (
        <path key={land.id} {...land} fill={colors[land.owner]} />
      ))}
      {props.labels.map(label => (
        <text key={label.title} {...label}>
          {label.title}
        </text>
      ))}
    </svg>
  );
}
