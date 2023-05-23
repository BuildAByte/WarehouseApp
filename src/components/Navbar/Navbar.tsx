import { Link } from "react-router-dom";
import "./Navbar.css";
import { user } from "../../api/api";

const routes = [{ path: "/app/works", name: "Works" }];
const adminRoutes = [
  { path: "/app/workers", name: "Workers" },
  { path: "/app/time", name: "Results" },
  { path: "/app/pivot-results", name: "Pivot Results" },
];
export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user")!) as user;
  const isAdmin = user.admin;

  function mapRoutes() {
    return routes.map(({ path, name }) => (
      <div className="navbarItem">
        <Link to={path}>{name}</Link>
      </div>
    ));
  }

  function mapAdminRoutes() {
    return adminRoutes.map(({ path, name }) => (
      <div className="navbarItem">
        <Link to={path}>{name}</Link>
      </div>
    ));
  }
  return (
    <div className="navbarParent">
      {mapRoutes()}
      {isAdmin ? mapAdminRoutes() : undefined}
      <div className="logoutNavbarItem">
        <Link to="/">Logout</Link>
      </div>
    </div>
  );
}
