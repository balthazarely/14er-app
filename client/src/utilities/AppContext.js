import React, { createContext, useState, useEffect } from "react";
import useMountains from "../hooks/useMountains";
import { createGeoJson } from "./utilities";
import axios from "axios";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [mountains, setMountains] = useState(null);
  const [favorieMountains, setFavorieMountains] = useState(null);

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
      setMountains(geojson);
    }
    async function httpGetFavoriteMountains() {
      let response = await fetch(`http://localhost:8000/favoriteMountains`);
      let data = await response.json();
      console.log(data);
      setFavorieMountains(data);
    }
    httpGetMountains();
    httpGetFavoriteMountains();
  }, []);

  const addToDb = (mountain) => {
    const newFavorite = {
      id: mountain.id.toString(),
      name: mountain.name,
    };
    console.log(newFavorite);
    setFavorieMountains([...favorieMountains, newFavorite]);
    try {
      axios
        .post("http://localhost:8000/favoriteMountains", {
          id: mountain.id,
          name: mountain.name,
        })
        .then(function (response) {
          console.log(response);
        });
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const removeFromDb = (mountain) => {
    const newFavorite = {
      id: mountain.id.toString(),
      name: mountain.name,
    };
    console.log(newFavorite);
    const newList = favorieMountains.filter(
      (fav) => fav.id !== mountain.id.toString()
    );
    setFavorieMountains(newList);
    try {
      axios
        .delete("http://localhost:8000/favoriteMountains", {
          data: { id: mountain.id, name: mountain.name },
        })
        .then(function (response) {
          console.log(response);
        });
    } catch (error) {
      console.error(error.response.data);
    }
  };

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
        favorieMountains,
        pulloutCardOpen,
        setPullout,
        togglePullout,
        updateSelectedMountain,
        mountainSelected,
        isSearchDropdownHidden,
        toggleSearchDropdown,
        mapStyle,
        updateMapStyle,
        addToDb,
        removeFromDb,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
