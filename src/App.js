import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddIncident from "./components/add-incident";
// import Incident from "./components/incident";
import IncidentsList from "./components/incidents-list";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container justify-content-start">
            <Link to={"/"} className="navbar-brand">
              Incidentes
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Visualizar
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Adicionar
                </Link>
              </li>
            </div>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route exact path="/" element={<IncidentsList/>} />
            <Route exact path="/add" element={<AddIncident/>} />
            {/* 
            <Route exact path="/ver/:id" element={<Incident/>} /> */}
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
