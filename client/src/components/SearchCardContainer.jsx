import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../utilities/AppContext";

export default function SearchCardContainer({ flyToCoords }) {
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
        // console.log(globalContext.mountains);
        globalContext.mountains.features.map((mtn) => {
          if (
            mtn.properties.Mountain_Peak.toLowerCase().includes(searchQuery)
          ) {
            searchResults.push(mtn);
          }
        });

        setSearchResults(searchResults);
        console.log(searchResults);

        // const { tracks } = await searchForArtist(searchQuery);
        // setSearchResults(tracks);
        // console.log(tracks);
      }
    };

    let debouncer = setTimeout(() => {
      setLoading(true);
      callSearchService();

      console.log("calling the filter to change the data");
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, 400);
    return () => {
      clearTimeout(debouncer);
    };
  }, [searchQuery]);

  return (
    <div
      className={`  absolute right-0 top-0 bg-white z-50  w-80 transition-all duration-200 p-8 `}
    >
      <input
        onChange={(e) => setUserInput(e.target.value)}
        className="border-4"
      />
      {searchResults &&
        searchResults.map((result) => (
          <div
            onClick={() => {
              flyToCoords(result.properties.Long, result.properties.Lat);
              globalContext.updateSelectedMountain(result.properties);
            }}
          >
            {result.properties.Mountain_Peak}
          </div>
        ))}
    </div>
  );
}
