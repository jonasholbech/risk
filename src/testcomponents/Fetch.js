import React, { useEffect } from "react";

export default function Fetch(props) {
  useEffect(() => {
    props.send("FETCH");
    fetch("data/usdata.json")
      .then(res => res.json())
      .then(data => {
        props.send({
          type: "RESOLVE",
          data: data
        }); //TODO: catch
      });
  });
  return <p>Loading</p>;
}
