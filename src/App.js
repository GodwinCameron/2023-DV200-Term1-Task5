import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import ChartFive from "./components/ChartFiveComponent/ChartFiveComponent";
import ChartFour from "./components/ChartFourComponent/ChartFourComponent";
import ChartOne from "./components/ChartOneComponent/ChartOneComponent";
import ChartThree from "./components/ChartThreeComponent/ChartThreeComponent";
import ChartTwo from "./components/ChartTwoComponent/ChartTwoComponent";
import Landing from "./Landing";


function App() {

  
  return (
    <div className="main">
      <Routes>
        <Route path="/"element={<Landing/>}/>
        <Route path="/vertical-bar-chart"element={<ChartOne/>}/>
        <Route path="/doughnut-chart"element={<ChartTwo/>}/>
        <Route path="/scatter-chart"element={<ChartThree/>}/>
        <Route path="/polar-area-chart"element={<ChartFour/>}/>
        <Route path="/horizontal-bar-chart"element={<ChartFive/>}/>
      </Routes>
    </div>
  );
}

export default App;
