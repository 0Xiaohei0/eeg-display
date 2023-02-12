import "./App.css";
import DashBoardPage from "./Pages/DashBoardPage";
import { Route, Routes } from "react-router-dom";
import GalleryPage from "./Components/Gallery";
import SideBar from "./Components/SideBar";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <DashBoardPage />
            </>
          }
        />
        <Route
          path="/gallery"
          element={
            <>
              <Navbar />
              <SideBar />
              <GalleryPage />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
