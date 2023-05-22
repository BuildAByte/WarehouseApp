import Navbar from "../../components/Navbar/Navbar";
import "./App.css";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="main">
      <Navbar />
      <div className="containerApp">
        <Outlet />
      </div>
    </div>
  );
}
