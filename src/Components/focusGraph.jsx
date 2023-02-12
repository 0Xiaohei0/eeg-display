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
import { TestData, updateTestData, getPreviousValue } from "../Data/testData";

let dataSource = TestData;
let updateDataSource = updateTestData;
const focusThreshold = 0.8;
const DATA_UPDATE_INTERVAL = 30;

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
  const [focusAmount, setFocusAmount] = useState(0);
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
      setRefresh(true);
    }, DATA_UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [refresh, isFocusing]);

  return (
    <div className="focusGraph--container">
      <div className="focusCircle--head">
        <div className="focusCircle--container">
          <div
            className={
              "focusCircle " +
              (dataSource[0].data >= focusThreshold ? "green" : "blue")
            }
          />
          <h3>
            {dataSource[0].data >= focusThreshold ? "focusing" : "not focusing"}
          </h3>
        </div>
        <div
          href="#"
          className="inline-block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow "
        >
          <h5 className="mb-2 text-2xl font-bold ">Focus Value</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {dataSource[0].data}
          </p>
          <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
            {getPreviousValue()}
          </span>
        </div>
      </div>
      <div className="focusGraph--chart">
        <Line ref={chartReference} options={options} data={data} />
      </div>
    </div>
  );
}

export default FocusGraph;
