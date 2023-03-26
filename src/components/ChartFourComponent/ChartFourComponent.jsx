import React from "react";
import styles from "./ChartFourStyle.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const ChartFour = () => {
  const [apiData, setApiData] = useState([]);
  const [missionName, setMissionName] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v3/launches?offset=25&limit=20")
      .then((result) => {
        let data = result.data;
        const flightAP = [];
        const missionNameP = [];
        for (let i = 0; i < data.length; i++) {
          flightAP.push(
            data[i].rocket.second_stage.payloads[0].orbit_params.lifespan_years
          );
          missionNameP.push(data[i].mission_name);
        }
        setApiData(flightAP);
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
        label: "# of Votes",
        data: apiData,
        backgroundColor: [
          "rgba(173, 255, 47, 1)",
          "rgba(127, 211, 0, 1)",
          "rgba(100, 167, 0, 1)",
          "rgba(77, 128, 0, 1)",
          "rgba(54, 90, 0, 1)",

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
      <h4 className={styles.text}>Lifespan in years of SPACEX payloads:</h4>
      <div className={styles.bar}>
        <PolarArea data={data} />
      </div>
    </>
  );
};

export default ChartFour;
