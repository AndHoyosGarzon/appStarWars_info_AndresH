import { BrowserRouter, Routes, Route } from "react-router-dom";
import InfoCard from "../components/InfoCard/InfoCard";
import NavBar from "./NavBar";
import InfoVehicles from "../components/InfoCard/infoVehicles";
import InfoPlanets from "../components/InfoCard/InfoPlanets";

function Home() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route path="/description/:id" element={<InfoCard />} />
        <Route path="/description/vehicle/:id" element={<InfoVehicles />} />
        <Route path="/description/planet/:id" element={<InfoPlanets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Home;
