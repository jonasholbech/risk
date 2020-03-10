import React from "react";
import { useMachine, send } from "@xstate/react";
import RiskMachine from "./statemachines/Risk";
import Fetch from "./testcomponents/Fetch";
import AddPlayer from "./testcomponents/AddPlayer";
import GetMissions from "./testcomponents/GetMissions";
import PlaceUnits from "./testcomponents/PlaceUnits";
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

      {contexts.map(ctx => {
        return (
          <details
            key={ctx.name}
            open={JSON.stringify(ctx.value).length < 100 ? true : false}
          >
            <summary>{ctx.name}</summary>
            <pre>{JSON.stringify(ctx.value, undefined, 4)}</pre>
          </details>
        );
      })}

      <hr />
      <h3>Custom actions</h3>
      {current.value === "idle" && <Fetch send={send} />}
      {current.value === "addPlayers" && (
        <AddPlayer players={current.context.players} send={send} />
      )}
      {current.value === "getMissions" && (
        <GetMissions players={current.context.players} send={send} />
      )}
      {current.value === "placeUnits" && (
        <PlaceUnits
          players={current.context.players}
          lands={current.context.lands}
          currentPlayer={current.context.currentPlayer}
          send={send}
        />
      )}

      <hr />
      <Map lands={current.context.lands} players={current.context.players} />
    </div>
  );
}
