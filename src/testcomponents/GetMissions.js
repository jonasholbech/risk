import React, { useEffect } from "react";

export default function GetMissions({ players, send }) {
  const notAccepted = players.filter(pl => pl.mission.accepted === false);
  useEffect(() => {
    if (notAccepted.length === 0) {
      send("NEXT");
    }
  });

  return (
    <>
      <h3>Get Missions</h3>
      {notAccepted.map(player => {
        return (
          <div key={player.id}>
            <h4>{player.name}</h4>
            <p>{player.mission.goal}</p>
            <button
              onClick={e => {
                send({
                  type: "ACCEPT",
                  payload: {
                    id: player.id
                  }
                });
              }}
            >
              Accept
            </button>
          </div>
        );
      })}
    </>
  );
}
