import React, { useState, useEffect } from "react";
import BasicMap from "./BasicMap";

export default function Dashboard() {
  const [lng, setLng] = useState(-105.9);
  const [lat, setLat] = useState(39.35);
  const [zoom, setZoom] = useState(10);

  // useEffect(() => {
  //   async function httpGetMountains() {
  //     let response = await fetch(`http://localhost:8000`);
  //     let data = await response.json();
  //     console.log(data);
  //   }
  //   httpGetMountains();
  // }, []);

  return (
    <div>
      {/* <div style={{height: "100vh"}}> */}
      {/* <TerrainMap lng={lng} setLng={setLng} lat={lat} setLat={setLat} zoom={zoom} setZoom={setZoom}   /> */}
      <BasicMap
        lng={lng}
        setLng={setLng}
        lat={lat}
        setLat={setLat}
        zoom={zoom}
        setZoom={setZoom}
      />

      {/* </div> */}
      <div>{/* <MountainCardContainer /> */}</div>
    </div>
  );
}
