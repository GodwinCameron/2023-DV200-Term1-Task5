import React from "react";
import styles from "./ChartFiveStyle.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const ChartFive = () => {
  const [apiData, setApiData] = useState([]);
  const [missionName, setMissionName] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v3/launches?offset=20&limit=20")
      .then((result) => {
        let data = result.data;
        const flightAP = [];
        const missionNameP = [];
        for (let i = 0; i < data.length; i++) {
          flightAP.push(
            data[i].rocket.second_stage.payloads[0].orbit_params.longitude
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

  const labels = missionName;

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart',
      },
    },
  };
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Longitude angle',
        data: apiData,
        borderColor: 'rgba(173, 255, 47, 1)',
        backgroundColor: 'rgba(173, 255, 47, 1)',
      },
    ],
  };

  return (
    <>
      <Link to={"/"}>
        <button className="chart-btn">&#60; Back</button>
      </Link>
      <h4 className={styles.text}>Orbital Axis of SPACEX payloads:</h4>
      <div className={styles.bar}>
        <Bar options={options} data={data} />
      </div>
    </>
  );
};

export default ChartFive;









