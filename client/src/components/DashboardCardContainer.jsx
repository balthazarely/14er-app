import React, { useContext, useRef } from "react";
import { AppContext } from "../utilities/AppContext";
import DefaultPullOutCard from "./DefaultPullOutCard";
import MountainPulloutCard from "./MountainPulloutCard";
import SearchCardContainer from "./SearchCardContainer";
import { ArrowLeftIcon } from "@heroicons/react/solid";

export default function DashboardCardContainer({
  flyToCoords,
  resetMapView,
  childFunc,
}) {
  const globalContext = useContext(AppContext);

  return (
    <div className="h-screen">
      <ArrowLeftIcon
        onClick={() => globalContext.togglePullout()}
        className={` ${
          globalContext.pulloutCardOpen ? "rotate-0" : "rotate-180"
        } absolute z-50 w-6 h-12 p-1 text-red-800 -translate-y-1/2 bg-white cursor-pointer top-1/2 transform -right-6 hover:bg-gray-100`}
      />
      <SearchCardContainer childFunc={childFunc} flyToCoords={flyToCoords} />
      <div className="mt-8">
        {globalContext.mountainSelected ? (
          <MountainPulloutCard
            flyToCoords={flyToCoords}
            resetMapView={resetMapView}
          />
        ) : (
          <DefaultPullOutCard />
        )}
      </div>
    </div>
  );
}
