import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../utilities/AppContext";
import { FaMountain } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";

export default function SearchCardContainer({ flyToCoords, childFunc }) {
  const globalContext = useContext(AppContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const setUserInput = (query) => {
    let sanitizedString = query.toLowerCase();
    setSearchQuery(sanitizedString);
  };

  useEffect(() => {
    if (searchQuery.length < 3) {
      setSearchResults(null);
      return;
    }

    const callSearchService = async () => {
      if (searchQuery.length > 2) {
        let searchResults = [];
        globalContext.mountains.features.map((mtn) => {
          if (
            mtn.properties.Mountain_Peak.toLowerCase().includes(searchQuery)
          ) {
            searchResults.push(mtn);
          }
        });
        setSearchResults(searchResults);
      }
    };

    let debouncer = setTimeout(() => {
      setLoading(true);
      callSearchService();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, 400);
    return () => {
      clearTimeout(debouncer);
    };
  }, [searchQuery]);

  React.useEffect(() => {
    childFunc.current = alertUser;
  }, []);

  function alertUser() {
    setSearchQuery("");
  }

  return (
    <div
      className={` relative bg-white z-50 w-72 transition-all duration-200 p-8  `}
    >
      <div className="absolute">
        <input
          value={searchQuery}
          onChange={(e) => setUserInput(e.target.value)}
          onClick={() => globalContext.toggleSearchDropdown(false)}
          className={`focus:outline-none focus:border-gray-500 h-10 w-56 p-4 border-2 border-gray-300 rounded-md`}
        />
        <BiSearchAlt className="absolute text-xl text-gray-400 right-2 top-2.5" />
        <div
          className={` ${
            globalContext.isSearchDropdownHidden || searchResults == null
              ? "opacity-0   "
              : "opacity-100 "
          } absolute z-50  py-2 bg-white  transition-all duration-200 `}
        ></div>
        {searchResults &&
          searchResults.slice(0, 6).map((result) => (
            <div
              className={`flex items-center gap-2 p-2 transition duration-200 bg-white cursor-pointer hover:bg-gray-100`}
              onClick={() => {
                flyToCoords(result.properties.Long, result.properties.Lat);
                globalContext.updateSelectedMountain(result.properties);
                setSearchQuery(result.properties.Mountain_Peak);
                setSearchResults(null);
              }}
            >
              <FaMountain className="text-red-800" />
              {result.properties.Mountain_Peak}
            </div>
          ))}
      </div>
    </div>
  );
}
