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
import { TestData, updateTestData } from "../Data/testData";

let dataSource = TestData;
let updateDataSource = updateTestData;
const focusThreshold = 0.8;

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
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Focus meter",
    },
  },
};

const labels = dataSource.map((data) => data.label);

export const data = {
  labels,
  datasets: [
    {
      label: "focus value",
      data: dataSource.map((d) => d.data),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};
function FocusGraph() {
  const chartReference = useRef();
  const [refresh, setRefresh] = useState(false);
  const [isFocusing, setIsFocusing] = useState(false);
  window.addEventListener("storage", () => {
    //console.log("dataChage");
    setRefresh(!refresh);
  });
  useEffect(() => {
    const interval = setInterval(() => {
      //console.log("UpdatingData");
      updateDataSource();
      const chart = chartReference.current;
      //console.log(chart);
      chart.data.datasets[0].data = dataSource.map((d) => d.data);
      chart.data.labels = dataSource.map((d) => d.label);
      //.log(chart.data.datasets[0].data);
      chart.update();
      if (dataSource[0].data >= focusThreshold && !isFocusing) {
        setIsFocusing(true);
      } else if (dataSource[0].data < focusThreshold && isFocusing) {
        setIsFocusing(false);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [refresh, isFocusing]);

  return (
    <div className="focusGraph--container">
      <div
        className={
          "focusCircle " +
          (dataSource[0].data >= focusThreshold ? "green" : "blue")
        }
      />
      <Line ref={chartReference} options={options} data={data} />
    </div>
  );
}

export default FocusGraph;
