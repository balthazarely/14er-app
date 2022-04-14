import React, { useEffect, useState, useContext } from "react";
import { SwishSpinner } from "react-spinners-kit";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { AppContext } from "../utilities/AppContext";

export default function MountainPulloutCard() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const globalContext = useContext(AppContext);

  const onLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    setImageLoaded(false);
  }, [globalContext.mountainSelected]);

  return (
    <div className="relative flex flex-col justify-center px-8 py-8 border-2 shadow-2xl ">
      <ArrowLeftIcon
        onClick={() => globalContext.togglePullout()}
        className={` ${
          globalContext.pulloutCardOpen ? " rotate-0" : "rotate-180"
        } absolute z-50 w-6 h-12 p-1 text-red-800 -translate-y-1/2 bg-white cursor-pointer top-1/2 transform -right-6 hover:bg-gray-100`}
      />

      {globalContext.mountainSelected ? (
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
          <div className="flex flex-row justify-start mt-6 gap-7">
            <div className="flex flex-col items-start ">
              <div className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                Feet
              </div>
              <div className="text-base font-bold text-black uppercase">
                {globalContext.mountainSelected.Elevation_ft}{" "}
                <span className="text-gray-500 lowercase">ft</span>
              </div>
            </div>
            <div className="flex flex-col items-start ">
              <div className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                Distance
              </div>
              <div className="text-base font-bold text-black uppercase">
                {globalContext.mountainSelected.Distance_mi}{" "}
                <span className="text-gray-500 lowercase">mi</span>
              </div>
            </div>
            <div className="flex flex-col items-start ">
              <div className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                Elev. Gain
              </div>
              <div className="text-base font-bold text-black uppercase">
                {globalContext.mountainSelected.Elevation_Gain_ft}{" "}
                <span className="text-gray-500 lowercase">ft</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mt-6">
            <div className="text-sm leading-6 text-gray-700">
              Browse 10,000+ hiking app work, designs, illustrations, and
              graphic elementsBrowse 10,000+ hiking app work, designs,
              illustrations, and graphic elements
            </div>
          </div>
          <Link className="w-full" to={`${globalContext.mountainSelected.ID}`}>
            <button className="w-full px-6 py-4 mt-6 text-sm font-bold text-white uppercase bg-red-800 bg-red">
              View In 3d
            </button>
          </Link>
        </>
      ) : (
        <>
          <div className="text-2xl font-bold text-red-800">
            Click on a map point to get started!
          </div>
        </>
      )}
    </div>
  );
}
