import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { SwishSpinner } from "react-spinners-kit";

export default function SingleMoutain() {
  let { mountainId } = useParams();
  const [singleMountain, setSingleMountain] = useState(null);
  const [loading, setLoading] = useState(true);
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    async function httpGetMountain() {
      let response = await fetch(
        `http://localhost:8000/mountains/${mountainId}`
      );
      let data = await response.json();
      console.log(data, "geojson");
      setSingleMountain(data);
    }
    httpGetMountain();
  }, []);

  useEffect(() => {
    if (map.current || !singleMountain) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y",
      center: [+singleMountain.Long, +singleMountain.Lat],
      zoom: 13,
      bearing: 10,
      speed: 2,
      curve: 1,
      pitch: 80,
    });
  });

  function rotateCamera(timestamp) {
    // clamp the rotation between 0 -360 degrees
    // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
    map.current.rotateTo((timestamp / 100) % 360, { duration: 0 });
    // Request the next frame of the animation.
    requestAnimationFrame(rotateCamera);
  }

  useEffect(() => {
    if (!map.current || !singleMountain) return; // wait for map to initialize
    map.current.on("move", () => {
      // setLng(map.current.getCenter().lng.toFixed(4));
      // setLat(map.current.getCenter().lat.toFixed(4));
      // setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("load", () => {
      map.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 15,
      });
      map.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
      map.current.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          // set up the sky layer to use a color gradient
          "sky-type": "gradient",
          // the sky will be lightest in the center and get darker moving radially outward
          // this simulates the look of the sun just below the horizon
          "sky-gradient": [
            "interpolate",
            ["linear"],
            ["sky-radial-progress"],
            0.8,
            "rgba(135, 206, 235, 1.0)",
            1,
            "rgba(0,0,0,0.1)",
          ],
          "sky-gradient-center": [0, 0],
          "sky-gradient-radius": 90,
          "sky-opacity": [
            "interpolate",
            ["exponential", 0.1],
            ["zoom"],
            5,
            0,
            22,
            1,
          ],
        },
      });
      map.current.setFog({
        range: [-1, 0],
        color: "white",
        "horizon-blend": 0.05,
      });
      new mapboxgl.Marker()
        .setLngLat([singleMountain.Long, singleMountain.Lat])
        .addTo(map.current);

      map.current.once("moveend", () => {
        console.log("done");
      });
      map.current.once("idle", () => {
        setLoading(false);
        map.current.flyTo({
          center: [+singleMountain.Long, +singleMountain.Lat],
          essential: true,
          zoom: 14,
          bearing: 30,
          // speed: 4,
          curve: 1,
          pitch: 85,
          duration: 4000,
        });
      });
    });
  });

  return (
    <div className="relative dashboard">
      {loading && (
        <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen ">
          <SwishSpinner size={30} color="#686769" loading={loading} />
        </div>
      )}
      <div
        ref={mapContainer}
        className={`map-container  ${loading ? "opacity-0" : "opacity-100"}`}
      />
    </div>
  );
}
