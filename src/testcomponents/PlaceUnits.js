import React, { useState } from "react";
import Map from "./Map";
export default function PlaceUnits({ players, lands, currentPlayer, send }) {
  const [numberToPlace, setNumberToPlace] = useState(1);
  function clickHandler(e) {
    //console.dir(e.target, e.currentTarget);
    let id = null;
    if (e.target.nodeName === "g") {
      //TODO: thorw
      console.error("G clicked in place Units");
    }
    if (e.target.nodeName === "text") {
      id = e.target.getAttribute("title");
    } else if (e.target.nodeName === "path") {
      id = e.target.id;
    }
    if (!id) {
      return;
    }
    const land = lands.find(el => el.id === id);
    console.log(land.owner, players[currentPlayer].id);
    if (land.owner === players[currentPlayer].id) {
      //The player owns the clicked land
      console.log("placing", numberToPlace, "at", id);
      send({
        type: "PLACE",
        payload: {
          where: id,
          number: numberToPlace
        }
      });
    }
  }
  return (
    <>
      <h3>Place Units</h3>
      <input
        type="number"
        value={numberToPlace}
        onChange={e => setNumberToPlace(e.target.value)}
      />
      <hr />
      <Map lands={lands} players={players} clickHandler={clickHandler} />
    </>
  );
}
