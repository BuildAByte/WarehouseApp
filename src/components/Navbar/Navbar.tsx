import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbarParent">
      <div className="navbarItem">
        <Link to="/app/workers">Workers</Link>
      </div>
      <div className="navbarItem">
        <Link to="/app/works">Works</Link>
      </div>
      <div className="navbarItem">
        <Link to="/app/history">History</Link>
      </div>
      <div className="navbarItem">
        <Link to="/app/pivotResults">Pivot Results</Link>
      </div>
      <div className="logoutNavbarItem">
        <Link to="/">Log out</Link>
      </div>
    </div>
  );
}
