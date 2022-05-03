import { useCallback, useEffect, useState } from "react";
import { createGeoJson } from "../utilities/utilities";

export default function useMountains() {
  const [planets, savePlanets] = useState([]);

  const getPlanets = useCallback(async () => {
    let fetchedPlanets = await fetch(`http://localhost:8000/mountains`);
    let jsonPlanets = await fetchedPlanets.json();
    let geojson = createGeoJson(jsonPlanets);
    savePlanets(geojson);
  }, []);

  useEffect(() => {
    getPlanets();
    console.log("HOOK IS HITTIng");
  }, [getPlanets]);

  return planets;
}
