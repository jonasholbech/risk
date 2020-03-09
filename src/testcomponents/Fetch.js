import React, { useEffect } from "react";

export default function Fetch(props) {
  useEffect(() => {
    props.send("FETCH");
    fetch("data/usdata.json")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(el => !el.ignore);
        props.send({
          type: "RESOLVE",
          data: filtered
        }); //TODO: catch
      });
  });
  return <p>Loading</p>;
}
