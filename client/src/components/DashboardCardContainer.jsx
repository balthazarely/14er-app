import React, { useContext } from "react";
import { AppContext } from "../utilities/AppContext";
import HomeCard from "./HomeCard";
import MountainPulloutCard from "./MountainPulloutCard";

export default function DashboardCardContainer() {
  const globalContext = useContext(AppContext);

  return (
    // <div className="relative top-0 left-0 z-50 overflow-hidden duration-200 transform bg-white shadow-2xl h-1/2 card-container w-80">
    <div
      className={` ${
        globalContext.pulloutCardOpen ? "translate-x-0" : "-translate-x-80"
      } absolute left-0 top-32 bg-white z-50  w-80 transition-all duration-200 `}
    >
      <MountainPulloutCard />
    </div>
    // </div>
  );
}
