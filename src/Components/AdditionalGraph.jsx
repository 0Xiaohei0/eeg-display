import React from "react";
import { useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getAdditionalData } from "../Data/additionalData";
import { MaxLength } from "../Data/testData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  animation: false,
  pointRadius: 0,
  borderWidth: 1,
  scales: {
    y: {
      max: 3000,
      min: -2000,
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "",
    },
  },
};

function AdditionalGraph({ index }) {
  const DATA_UPDATE_INTERVAL = 50;
  //getAdditionalData(index);
  const chartReference = useRef();
  const [refresh, setRefresh] = useState(false);
  const [dataSource, setDataSource] = useState(
    Array(MaxLength).fill({ label: "", data: 0 })
  );
  window.addEventListener("dataChange", () => {
    //console.log("dataChage");
    setRefresh(!refresh);
  });
  const labels = [];
  const data = {
    labels,
    datasets: [
      {
        label: "Blink activity",
        data: dataSource.map((d) => d.data),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  useEffect(() => {
    const interval = setInterval(() => {
      //console.log("UpdatingData");
      //updateDataSource();
      const chart = chartReference.current;
      //console.log(chart);
      chart.data.datasets[0].data = dataSource.map((d) => d.data);
      chart.data.labels = dataSource.map((d) => d.label);
      //.log(chart.data.datasets[0].data);
      chart.update();
    }, DATA_UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <div className="AdditionalGraph--container">
      <div className="">
        <Line ref={chartReference} options={options} data={data} />
      </div>
    </div>
  );
}

export default AdditionalGraph;
