import React from "react";
import styles from "./ChartThreeStyle.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const ChartThree = () => {
  const [apiData, setApiData] = useState([]);
  const [missionName, setMissionName] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v3/launches?offset=15&limit=10")
      .then((result) => {
        let data = result.data;
        const flightAP = [];
        const missionNameP = [];
        for (let i = 0; i < data.length; i++) {
          flightAP.push({
            x: data[i].rocket.second_stage.payloads[0].orbit_params.apoapsis_km,
            y: data[i].rocket.second_stage.payloads[0].orbit_params.periapsis_km,
          });
          missionNameP.push(data[i].mission_name);
        }
        setApiData(flightAP);
        setMissionName(missionNameP);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    datasets: [
      {
        label: "Orbit (km)",
        data: apiData,
        backgroundColor: "rgba(173, 255, 47, 1)",
      },
    ],
  };

  return (
    <>
      <Link to={"/"}>
        <button className="chart-btn">&#60; Back</button>
      </Link>
      <h4 className={styles.text}>Orbitals of SPACEX payloads:</h4>
      <div className={styles.bar}>
        <Scatter options={options} data={data} />
      </div>
    </>
  );
};

export default ChartThree;
