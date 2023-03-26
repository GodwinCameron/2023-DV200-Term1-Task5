import React from "react";
import styles from "./ChartOneStyle.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartOne = () => {
  const [apiData, setApiData] = useState([]);
  const [missionName, setMissionName] = useState([]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "SPACEX First 10 flight payload masses",
      },
    },
  };

  const labels = missionName;

  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v3/launches?offset=0&limit=10")
      .then((result) => {
        let data = result.data;
        const flightMass = [];
        const missionNameP = [];
        for (let i = 0; i < data.length; i++) {
          flightMass.push(
            data[i].rocket.second_stage.payloads[0].payload_mass_kg
          );
          missionNameP.push(data[i].mission_name);
        }
        setApiData(flightMass);
        setMissionName(missionNameP);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Payload mass in kg",
        data: apiData,
        backgroundColor: "rgba(173, 255, 47, 1)",
        color: "rgba(255,255,255,1)",
      },
    ],
  };

  return (
    <>
      <Link to={"/"}>
        <button className="chart-btn">&#60; Back</button>
      </Link>
      <h4 className={styles.text}>Masses of SPACEX payloads:</h4>
      <div className={styles.bar}>
        <Bar options={options} data={data} />
      </div>
    </>
  );
};

export default ChartOne;
