import React, { useState, useContext } from "react";
import { MachineContext } from "./statemachines/MachineProvider";
//import RISKMachine from "./statemachines/Risk";
//test  om state er det samme i multiple components (det er det ikke, noget med at abbonnere på service)
export default function Test(props) {
  const [state, send] = useContext(MachineContext);
  /*console.log(state);
  state.actions.forEach(action => {
    if (["idleExit"].includes(action.type)) {
      console.log("CAUGHT IDLE EXIT");
      state.context.currentPlayer = 100;
    }
  });*/
  const [initalTroops, setInitialTroops] = useState(null);

  //const machine = useMachine(RISKMachine);

  /*const [, , service] = useService(x, {
    actions: {
      setInitialTroops: ctx => setInitialTroops(20 + (6 - ctx.numPlayers) * 5)
    }
  });
  console.log(service);*/
  const contexts = [];
  for (let key in state.context) {
    if (state.context.hasOwnProperty(key)) {
      contexts.push({ name: key, value: state.context[key] });
    }
  }
  return (
    <div>
      <h1>
        State machines: {JSON.stringify(state.value)}, {initalTroops}
      </h1>
      {state.nextEvents.map(next => {
        return (
          <button key={next} onClick={() => send(next)}>
            {next}
          </button>
        );
      })}
      <ul>
        {contexts.map(ctx => {
          return (
            <li key={ctx.name}>
              {ctx.name}: {ctx.value}
            </li>
          );
        })}
      </ul>
      <input
        type="text"
        placeholder="Enter text"
        value={state.context.inputValue}
        onChange={e =>
          send({
            type: "TYPING",
            value: e.target.value
          })
        }
      />
    </div>
  );
}
