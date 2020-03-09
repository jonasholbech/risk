import React, { useState } from "react";
//import { useMachine, send } from "@xstate/react";
//import RiskMachine from "../statemachines/Risk";

export default function AddPlayer(props) {
  //const [current, send] = useMachine(RiskMachine);
  const [val, setVal] = useState("Jonas");
  const [color, setColor] = useState("#ff69b4");
  return (
    <>
      <hr />
      <form
        onSubmit={e => {
          e.preventDefault();
          props.send({
            type: "ADD_PLAYER",
            payload: {
              name: val,
              color: color
            }
          });
          setVal("Anders");
          setColor("#add8e6");
        }}
      >
        <input
          type="text"
          placeholder="Enter text"
          value={val}
          onChange={e => setVal(e.target.value)}
        />
        <input
          type="color"
          value={color}
          onChange={e => setColor(e.target.value)}
        />
        <button>Add Player</button>
      </form>
      <ul>
        {props.players.map(pl => (
          <li key={pl.id}>
            {pl.name}{" "}
            <button
              onClick={e =>
                props.send({
                  type: "REMOVE_PLAYER",
                  payload: {
                    id: pl.id
                  }
                })
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
