import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddIncident from './components/add-incident';
import SingleIncident from './components/single-incident';
import IncidentsList from './components/incidents-list';
import './App.css';

import { NotificationContainer } from 'react-notifications';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container justify-content-start">
              <Link to={'/'} className="navbar-brand">
                Incidentes
              </Link>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/'} className="nav-link">
                    Visualizar
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={'/add'} className="nav-link">
                    Adicionar
                  </Link>
                </li>
              </div>
            </div>
          </nav>

          <div className="container mt-3 pb-5">
            <Routes>
              <Route exact path="/" element={<IncidentsList />} />
              <Route exact path="/add" element={<AddIncident />} />
              <Route exact path="/edt/:id" element={<AddIncident />} />
              <Route exact path="/incident/:id" element={<SingleIncident />} />
              {/* 
              <Route exact path="/ver/:id" element={<Incident/>} /> */}
            </Routes>
          </div>

          <footer className="footer mt-auto py-3 bg-light">
            <div className="container text-center">
              <span className="text-muted">
                Copyright © {new Date().getFullYear()} - Wesley Souza
              </span>
            </div>
          </footer>
        </Router>
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
