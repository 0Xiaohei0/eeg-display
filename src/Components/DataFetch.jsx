import HttpCall from "./HttpCall";
import WebSocketCall from "./WebSocketCall";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { setDataInput } from "../Data/testData";

import React from "react";

export default function DataFetch() {
  const [socketInstance, setSocketInstance] = useState("");
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(true);

  const handleClick = () => {
    if (buttonStatus === false) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  };

  useEffect(() => {
    console.log("useEffect called");
    const socket = io("localhost:5001/", {
      transports: ["websocket"],
      cors: {
        origin: "*",
      },
    });

    setSocketInstance(socket);

    socket.on("connect", (d) => {
      console.log("connecting to backend");
      if (d) {
        setDataInput(JSON.parse(d.data)[2]);
        //console.log(JSON.parse(d.data)[0]);
      }
    });

    // socket.on("data", (data) => {
    //   console.log("connecting to bank");
    //   console.log(data);
    // });

    // setLoading(false);

    // socket.on("disconnect", (data) => {
    //   console.log(data);
    // });

    return function cleanup() {
      socket.disconnect();
    };
  }, []);

  return <div className="dataFetch"></div>;
}
