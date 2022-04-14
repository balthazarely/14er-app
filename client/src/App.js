import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SingleMoutain from "./components/SingleMoutain";
import "./App.css";
import { AppContextProvider } from "./utilities/AppContext";

export default function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <Routes>
          <Route path="/mountains" element={<Dashboard />} />
          <Route path="/mountains/:mountainId" element={<SingleMoutain />} />
          {/* <Route path="about" element={<About />} /> */}
        </Routes>
      </AppContextProvider>
    </div>
  );
}
