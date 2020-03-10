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
      onClick={props.clickHandler ? props.clickHandler : null}
    >
      {props.lands.map(land => {
        //TODO: spread all except one (label)
        return (
          <g key={land.id}>
            <path {...land} fill={colors[land.owner]} />
            <text {...land.label}>
              {land.label.title}:{land.troops || ""}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
