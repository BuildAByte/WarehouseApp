import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login/Login";
import "./index.css";
import ReactDOM from "react-dom/client";
import * as React from "react";
import ShowWorkers from "./screens/ShowWorkers/ShowWorkers";
import AddWorker from "./screens/AddWorker/AddWorker";
import App from "./screens/App/App";
import Works from "./screens/Works/Works";
import AddWork from "./screens/AddWork/AddWork";

function Main() {
  return (
    <div className="main">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/app" element={<App />}>
            <Route path="/app/workers" element={<ShowWorkers />} />
            <Route path="/app/add-worker" element={<AddWorker />} />
            <Route path="/app/works" element={<Works />} />
            <Route path="/app/add-work" element={<AddWork />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
