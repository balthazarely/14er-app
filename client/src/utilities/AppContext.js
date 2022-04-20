import React, { createContext, useState, useEffect } from "react";
import { createGeoJson } from "./utilities";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [mountains, setMountains] = useState(null);
  const [pulloutCardOpen, setPulloutCardOpen] = useState(true);
  const [mountainSelected, setMountainSelected] = useState(null);
  const [isSearchDropdownHidden, setIsSearchDropdownHidden] = useState(false);
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/balthazarely/cl1fplb2w005514qoq6sosxlu"
  );

  useEffect(() => {
    async function httpGetMountains() {
      let response = await fetch(`http://localhost:8000/mountains`);
      let data = await response.json();
      let geojson = createGeoJson(data);
      console.log(geojson, "geojson inside context");
      setMountains(geojson);
    }
    httpGetMountains();
  }, []);

  const togglePullout = () => {
    setPulloutCardOpen(!pulloutCardOpen);
  };

  const setPullout = (boolean) => {
    setPulloutCardOpen(boolean);
  };

  const updateSelectedMountain = (newMountain) => {
    setMountainSelected(newMountain);
  };

  const toggleSearchDropdown = (boolean) => {
    setIsSearchDropdownHidden(boolean);
  };

  const updateMapStyle = (str) => {
    setMapStyle(str);
  };

  return (
    <AppContext.Provider
      value={{
        mountains,
        pulloutCardOpen,
        setPullout,
        togglePullout,
        updateSelectedMountain,
        mountainSelected,
        isSearchDropdownHidden,
        toggleSearchDropdown,
        mapStyle,
        updateMapStyle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
