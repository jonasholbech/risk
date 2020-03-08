import React from "react";
const MachineContext = React.createContext();

const MachineProvider = ({ machineInstance, children }) => {
  return (
    <MachineContext.Provider value={machineInstance}>
      {children}
    </MachineContext.Provider>
  );
};
export { MachineProvider, MachineContext };
