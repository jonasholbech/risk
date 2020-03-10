import React, { useState } from "react";
import Map from "./Map";
export default function PlaceUnits({
  players,
  lands,
  currentPlayer,
  send,
  labels
}) {
  const [numberToPlace, setNumberToPlace] = useState(1);
  function clickHandler(e) {
    //console.dir(e.target, e.currentTarget);
    let id = null;
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
      <Map
        lands={lands}
        labels={labels}
        players={players}
        clickHandler={clickHandler}
      />
    </>
  );
}
