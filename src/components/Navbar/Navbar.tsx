import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbarParent">
      <div className="navbarItem">
        <Link to="/app">Workers</Link>
      </div>
      <div className="navbarItem">
        <Link to="/app/works">Works</Link>
      </div>
      <div className="navbarItem">
        <Link to="/history">History</Link>
      </div>
      <div className="navbarItem">
        <Link to="/currentMatch">Current Match</Link>
      </div>
    </div>
  );
}
