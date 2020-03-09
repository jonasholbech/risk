import React from "react";

export default function Map(props) {
  const colors = {};
  props.players.forEach(player => {
    colors[player.id] = player.color;
  });
  return (
    <svg
      enable_background="new 0 0 1000 589"
      height="589px"
      style={{ strokeLinejoin: "round", stroke: "#000", fill: "none" }}
      viewBox="0 0 1000 589"
      width="1000px"
      id="map"
    >
      {props.lands.map(land => (
        <path key={land.id} {...land} fill={colors[land.owner]} />
      ))}
      <text id="WA-text" x="240" y="80" class="small">
        WA
      </text>
      <text id="OR-text" x="210" y="150" class="small">
        OR
      </text>
      <text id="ID-text" x="310" y="170" class="small">
        ID
      </text>
      <text id="WY-text" x="400" y="200" class="small">
        WY
      </text>
      <text id="MT-text" x="370" y="120" class="small">
        MT
      </text>
      <text id="ND-text" x="500" y="110" class="small">
        ND
      </text>
      <text id="MN-text" x="580" y="150" class="small">
        MN
      </text>
      <text id="WI-text" x="660" y="160" class="small">
        WI
      </text>
      <text id="MI-text" x="740" y="180" class="small">
        MI
      </text>
      <text id="SD-text" x="500" y="170" class="small">
        SD
      </text>
      <text id="NE-text" x="500" y="230" class="small">
        NE
      </text>
      <text id="CA-text" x="200" y="300" class="small">
        CA
      </text>
      <text id="NV-text" x="250" y="250" class="small">
        NV
      </text>
      <text id="UT-text" x="330" y="270" class="small">
        UT
      </text>
      <text id="AZ-text" x="310" y="370" class="small">
        AZ
      </text>
      <text id="NM-text" x="410" y="370" class="small">
        NM
      </text>
      <text id="TX-text" x="530" y="430" class="small">
        TX
      </text>
      <text id="CO-text" x="410" y="280" class="small">
        CO
      </text>
      <text id="KS-text" x="540" y="290" class="small">
        KS
      </text>
      <text id="MO-text" x="620" y="290" class="small">
        MO
      </text>
      <text id="AR-text" x="640" y="360" class="small">
        AR
      </text>
      <text id="LA-text" x="640" y="430" class="small">
        LA
      </text>
      <text id="IA-text" x="610" y="220" class="small">
        IA
      </text>
      <text id="IL-text" x="680" y="250" class="small">
        IL
      </text>
      <text id="IN-text" x="730" y="250" class="small">
        IN
      </text>
      <text id="KY-text" x="760" y="290" class="small">
        KY
      </text>
      <text id="TN-text" x="720" y="333" class="small">
        TN
      </text>
      <text id="MS-text" x="690" y="400" class="small">
        MS
      </text>
      <text id="AL-text" x="740" y="390" class="small">
        AL
      </text>
      <text id="GA-text" x="790" y="380" class="small">
        GA
      </text>
      <text id="FL-text" x="850" y="480" class="small">
        FL
      </text>
      <text id="SC-text" x="840" y="350" class="small">
        SC
      </text>
      <text id="NC-text" x="840" y="310" class="small">
        NC
      </text>
      <text id="VA-text" x="856" y="266" class="small">
        VA
      </text>
      <text id="WV-text" x="810" y="260" class="small">
        WV
      </text>
      <text id="PA-text" x="850" y="200" class="small">
        PA
      </text>
      <text id="NY-text" x="870" y="150" class="small">
        NY
      </text>
      <text id="OH-text" x="770" y="230" class="small">
        OH
      </text>
      <text id="OK-text" x="540" y="350" class="small">
        OK
      </text>
    </svg>
  );
}
