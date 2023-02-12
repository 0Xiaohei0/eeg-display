import React from "react";
import DataFetch from "../Components/DataFetch";
import FocusGraph from "../Components/focusGraph";
import SideBar from "../Components/SideBar";
import Navbar from "../Components/Navbar";
import AdditionalGraph from "../Components/AdditionalGraph";

export default function DashBoardPage() {
  return (
    <div>
      <div className="DashboardContent--Container">
        <Navbar />
        <FocusGraph />
        {/* <AdditionalGraph index="2" />
        <AdditionalGraph index="3" />
        <AdditionalGraph index="4" /> */}
        <SideBar />
        <DataFetch />
      </div>
    </div>
  );
}
