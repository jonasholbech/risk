import React, { useEffect } from "react";

export default function Fetch(props) {
  useEffect(() => {
    props.send("FETCH");
    fetch("data/usdata.json")
      .then(res => res.json())
      .then(data => {
        const filtered = data.lands.filter(el => !el.ignore);
        props.send({
          type: "RESOLVE",
          lands: filtered,
          labels: data.labels
        }); //TODO: catch
      });
  });
  return <p>Loading</p>;
}
