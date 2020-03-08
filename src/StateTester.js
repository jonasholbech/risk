import React from "react";
import { useMachine, send } from "@xstate/react";
import RiskMachine from "./statemachines/Risk";
import AddPlayer from "./testcomponents/AddPlayer";
import Fetch from "./testcomponents/Fetch";
import Map from "./testcomponents/Map";
export default function StateTester() {
  const [current, send] = useMachine(RiskMachine);
  const contexts = [];
  for (let key in current.context) {
    if (current.context.hasOwnProperty(key)) {
      contexts.push({ name: key, value: current.context[key] });
    }
  }
  return (
    <div>
      <h1>State machines: {JSON.stringify(current.value)}</h1>
      <h2>Possible transitions:</h2>
      {current.nextEvents.map(next => {
        return (
          <button key={next} onClick={() => send(next)}>
            {next}
          </button>
        );
      })}
      <h2>Context</h2>
      <ul>
        {contexts.map(ctx => {
          return (
            <li key={ctx.name}>
              {ctx.name}: {ctx.name !== "lands" && JSON.stringify(ctx.value)}
            </li>
          );
        })}
      </ul>
      <Map lands={current.context.lands} players={current.context.players} />
      <h3>Custom actions</h3>
      {current.value === "idle" && <Fetch send={send} />}
      {current.value === "addPlayers" && (
        <AddPlayer players={current.context.players} send={send} />
      )}
    </div>
  );
}
