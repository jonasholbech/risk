import React, { useEffect } from "react";

export default function Fetch(props) {
  useEffect(() => {
    props.send("FETCH");
    fetch("data/usdata.json")
      .then(res => res.json())
      .then(data => {
        const filtered = data.lands;
        props.send({
          type: "RESOLVE",
          lands: filtered
        }); //TODO: catch
      });
  });
  return <p>Loading</p>;
}
