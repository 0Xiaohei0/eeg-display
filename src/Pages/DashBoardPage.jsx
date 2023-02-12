import React from "react";
import DataFetch from "../Components/DataFetch";
import FocusGraph from "../Components/focusGraph";
import SideBar from "../Components/SideBar";
import Navbar from "../Components/Navbar";

export default function DashBoardPage() {
  return (
    <div>
      <div className="DashboardContent--Container">
        <Navbar />
        <FocusGraph />
        <SideBar />
        <DataFetch />
      </div>
    </div>
  );
}
