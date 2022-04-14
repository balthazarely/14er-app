import React, { useRef, useEffect, useState, useContext } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import queryString from "query-string";
import { AppContext } from "../utilities/AppContext";

import DashboardCardContainer from "./DashboardCardContainer";
import SearchCardContainer from "./SearchCardContainer";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYmFsdGhhemFyZWx5IiwiYSI6ImNrMDZzdWdsMTAwdjQzb3BkaTV1bm9nMXgifQ.yo3WzpDZCoXN35miOeEHKQ";

export default function BasicMap({ lng, setLng, lat, setLat, zoom, setZoom }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const globalContext = useContext(AppContext);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/balthazarely/cl1fplb2w005514qoq6sosxlu",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current || !globalContext.mountains) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("load", () => {
      map.current.addSource("earthquakes", {
        type: "geojson",
        data: globalContext.mountains,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });
      map.current.addLayer({
        id: "clusters",
        type: "circle",
        source: "earthquakes",
        filter: ["has", "point_count"],

        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#991b1b",
            100,
            "#f1f075",
            750,
            "#f28cb1",
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            100,
            30,
            750,
            40,
          ],
          "circle-stroke-width": 4,
          "circle-stroke-color": "#fff",
        },
      });

      map.current.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "earthquakes",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 16,
        },
        paint: {
          "text-color": "#ffffff",
        },
      });

      map.current.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "earthquakes",
        filter: ["!", ["has", "point_count"]],

        paint: {
          "circle-color": "#991b1b",
          "circle-radius": 8,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff",
        },
      });

      map.current.on("click", "clusters", (e) => {
        const features = map.current.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        const clusterId = features[0].properties.cluster_id;
        map.current
          .getSource("earthquakes")
          .getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;

            map.current.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
              duration: 1000,
            });
          });
      });
      map.current.on("click", "unclustered-point", (e) => {
        globalContext.updateSelectedMountain(null);
        window.history.replaceState(
          null,
          null,
          `?mountain=${e.features[0].properties.ID}`
        );

        globalContext.updateSelectedMountain(e.features[0].properties);
        globalContext.setPullout(true);
        // setSelectedMountain(e.features[0].properties);
        console.log(e.features[0].properties);
        map.current.flyTo({
          center: e.features[0].geometry.coordinates,
          zoom: 14,
          duration: 2000,
          essential: true,
        });

        // let newMarker = new mapboxgl.Marker()
        //   .setLngLat(e.features[0].geometry.coordinates)
        //   .addTo(map.current);
      });

      map.current.on("mouseenter", "clusters", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });
      map.current.on("mouseleave", "clusters", () => {
        map.current.getCanvas().style.cursor = "";
      });
    });
  });

  useEffect(() => {
    if (globalContext.mountains) {
      let tempCoords = globalContext.mountains.features.map(
        (item) => item.geometry.coordinates
      );
      const bounds = new mapboxgl.LngLatBounds(tempCoords[0], tempCoords[0]);
      for (const coord of tempCoords) {
        bounds.extend(coord);
      }
      map.current.fitBounds(bounds, {
        padding: 20,
      });
    }
  }, [globalContext.mountains]);

  useEffect(() => {
    const queryParams = queryString.parse(window.location.search);
    if (globalContext.mountains && queryParams.mountain) {
      let queryPoint = globalContext.mountains.features.find(
        (mountain) => mountain.properties.ID === +queryParams.mountain
      );

      globalContext.updateSelectedMountain(queryPoint.properties);
      map.current.flyTo({
        center: queryPoint.geometry.coordinates,
        zoom: 14,
        duration: 2000,
        essential: true,
      });
      globalContext.setPullout(true);
    }
  }, [globalContext.mountains]);

  useEffect(() => {
    console.log("mountain has been selected....");
  }, [globalContext.mountainSelected]);

  return (
    <div className="relative dashboard">
      <SearchCardContainer />
      <DashboardCardContainer />
      <div className={`map-container`} ref={mapContainer} />
    </div>
  );
}
