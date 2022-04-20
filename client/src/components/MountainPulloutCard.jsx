import React, { useEffect, useState, useContext } from "react";
import { SwishSpinner } from "react-spinners-kit";
import { Link } from "react-router-dom";
import { AppContext } from "../utilities/AppContext";
import { BiCurrentLocation } from "react-icons/bi";
import { HiArrowLeft } from "react-icons/hi";

export default function MountainPulloutCard({ flyToCoords, resetMapView }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const globalContext = useContext(AppContext);

  const onLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    setImageLoaded(false);
  }, [globalContext.mountainSelected]);

  return (
    <div className="flex flex-col px-8 pb-8 border-4 ">
      {globalContext.mountainSelected && (
        <>
          <div className="relative w-full h-56 ">
            <div className="absolute top-0 left-0 w-full h-full ">
              <img
                onLoad={onLoad}
                className={`object-cover w-full h-full shadow-lg rounded-xl transition duration-200 opacity-0 ${
                  imageLoaded && "opacity-100"
                } `}
                src={globalContext.mountainSelected.photo}
              />
            </div>
            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full ">
              {!imageLoaded && (
                <SwishSpinner size={30} color="#686769" loading={true} />
              )}
            </div>
          </div>

          <div className="mt-6 text-2xl font-bold">
            {globalContext.mountainSelected.Mountain_Peak}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="">
              <div className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                Feet
              </div>
              <div className="text-base font-bold text-black uppercase">
                {globalContext.mountainSelected.Elevation_ft}{" "}
                <span className="text-gray-500 lowercase">ft</span>
              </div>
            </div>
            <div className="">
              <div className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                Distance
              </div>
              <div className="text-base font-bold text-black uppercase">
                {globalContext.mountainSelected.Distance_mi}{" "}
                <span className="text-gray-500 lowercase">mi</span>
              </div>
            </div>
            <div className="">
              <div className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                Elev. Gain
              </div>
              <div className="text-base font-bold text-black uppercase">
                {globalContext.mountainSelected.Elevation_Gain_ft}{" "}
                <span className="text-gray-500 lowercase">ft</span>
              </div>
            </div>
            <div className="">
              <div className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                Class
              </div>
              <div className="text-sm font-bold text-black">
                {globalContext.mountainSelected.Difficulty}{" "}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mt-8">
            <div className="text-sm leading-6 text-gray-700">
              Browse 10,000+ hiking app work, designs, illustrations, and
              graphic elementsBrowse 10,000+ hiking app work, designs,
              illustrations, and graphic elements
            </div>
          </div>

          <div className="flex gap-1 mt-6 ">
            <button
              onClick={() => {
                globalContext.updateSelectedMountain(null);
                window.history.replaceState(null, null, `mountains`);
                resetMapView();
              }}
              className="px-4 py-4 text-sm font-bold text-white uppercase bg-red-800 hover:bg-red-900"
            >
              <HiArrowLeft className="text-xl" />
            </button>

            <button
              onClick={() => {
                flyToCoords(
                  globalContext.mountainSelected.Long,
                  globalContext.mountainSelected.Lat
                );
              }}
              className="px-4 py-4 text-sm font-bold text-white uppercase bg-red-800 hover:bg-red-900"
            >
              <BiCurrentLocation className="text-xl" />
            </button>
            <Link
              className="w-full"
              to={`${globalContext.mountainSelected.ID}`}
            >
              <button className="w-full px-6 py-4 text-sm font-bold text-white uppercase bg-red-800 hover:bg-red-900 ">
                3d Map
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
