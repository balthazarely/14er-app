import React, { useContext } from "react";
import { AppContext } from "../utilities/AppContext";

export default function DefaultPullOutCard({
  resetMapView,
  setSataliteMapStyle,
  setOutdoorMapStyle,
}) {
  const globalContext = useContext(AppContext);

  return (
    <div className="flex flex-col items-center justify-between w-full h-full text-center text-red-800 ">
      <div className="">
        <div className="text-4xl font-bold app-header-script">Colorado</div>
        <div className="-mt-3 text-5xl font-bold app-header-sans">14ers</div>
      </div>

      <div className="m-8">
        <div className="flex gap-4 m-4">
          <div className="flex flex-col justify-center">
            <div
              onClick={() => setOutdoorMapStyle()}
              className="w-16 h-16 bg-red-500 rounded-md cursor-pointer "
            ></div>
            <div className="text-sm">Outdoor</div>
          </div>
          <div className="flex flex-col justify-center">
            <div
              onClick={() => setSataliteMapStyle()}
              className="w-16 h-16 bg-red-500 rounded-md cursor-pointer"
            ></div>
            <div className="text-sm">Satalite</div>
          </div>
        </div>

        <button
          onClick={() => {
            resetMapView();
          }}
          className="w-24 px-1 py-2 text-xs font-bold text-white bg-red-800 rounded-lg "
        >
          Reset View
        </button>
      </div>
    </div>
  );
}
