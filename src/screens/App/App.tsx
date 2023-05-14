import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { getWorkers, user } from "../../api/api";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";

export default function App() {
  return (
    <div className="main">
      <Navbar />

      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}
