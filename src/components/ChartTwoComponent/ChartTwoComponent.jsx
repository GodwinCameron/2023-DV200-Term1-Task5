import React from "react";
import styles from "./ChartTwoStyle.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartTwo = () => {
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

  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v3/launches?offset=10&limit=5")
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
    labels: missionName,
    datasets: [
      {
        label: "Mass in kg",
        data: apiData,
        backgroundColor: [
          "rgba(173, 255, 47, 1)",
          "rgba(127, 211, 0, 1)",
          "rgba(100, 167, 0, 1)",
          "rgba(77, 128, 0, 1)",
          "rgba(54, 90, 0, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderColor: [
          "rgba(173, 255, 47, 1)",
          "rgba(127, 211, 0, 1)",
          "rgba(100, 167, 0, 1)",
          "rgba(77, 128, 0, 1)",
          "rgba(54, 90, 0, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
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
        <Doughnut data={data} />
      </div>
    </>
  );
};

export default ChartTwo;
