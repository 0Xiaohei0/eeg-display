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
import { min } from "moment/moment";
import { sendBlinkEventToBackend } from "./DataFetch";

let dataSource = TestData;
let updateDataSource = updateTestData;
const focusThreshold = 2000;
const DATA_UPDATE_INTERVAL = 50;

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

const labels = dataSource.map((data) => data.label);

export const data = {
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
function getNewestData() {
  if (dataSource) return dataSource[dataSource.length - 1].data;
  return 0;
}
function FocusGraph() {
  const chartReference = useRef();
  const [refresh, setRefresh] = useState(false);
  const [isFocusing, setIsFocusing] = useState(false);
  const [focusAmount, setFocusAmount] = useState(0);
  const [canBlink, setCanBlink] = useState(true);
  window.addEventListener("dataChange", () => {
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
      if (getNewestData() >= focusThreshold && !isFocusing) {
        setIsFocusing(true);
        if (canBlink) {
          sendBlinkEventToBackend();
          setCanBlink(false);
          setTimeout(function () {
            setCanBlink(true);
          }, 3 * 1000);
        }
      } else if (getNewestData() < focusThreshold && isFocusing) {
        setIsFocusing(false);
      }
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
              (getNewestData() >= focusThreshold ? "green" : "blue")
            }
          />
          <h3>
            {getNewestData() >= focusThreshold ? "blinking" : "not blinking"}
          </h3>
        </div>
        <div
          href="#"
          className="inline-block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow "
        >
          <h5 className="mb-2 text-2xl font-bold ">Blink Value</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {Math.round(getNewestData())}
          </p>
          <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
            {Math.round(getPreviousValue())}
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
