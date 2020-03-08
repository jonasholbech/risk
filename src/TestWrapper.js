import React from "react";
import { useMachine } from "@xstate/react";
import RISKMachine from "./statemachines/Risk";
import { MachineProvider } from "./statemachines/MachineProvider";
import Test from "./Test";

export default function TestWrapper(props) {
  const machineInstance = useMachine(RISKMachine);

  return (
    <MachineProvider machineInstance={machineInstance}>
      <div>
        <Test />
      </div>
    </MachineProvider>
  );
}
