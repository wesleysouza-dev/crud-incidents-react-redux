import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveIncidents,
  deleteAllIncidents,
} from "../actions/incidents";
import { Link } from "react-router-dom";

class IncidentsList extends Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveIncident = this.setActiveIncident.bind(this);
    this.removeAllIncidents = this.removeAllIncidents.bind(this);

    this.state = {
      currentIncident: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.props.retrieveIncidents();
  }

  refreshData() {
    this.setState({
      currentIncident: null,
      currentIndex: -1,
    });
  }

  setActiveIncident(incident, index) {
    this.setState({
      currentIncident: incident,
      currentIndex: index,
    });
  }

  removeAllIncidents() {
    this.props
      .deleteAllIncidents()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  arrowStatus = (text) => {
    let classIcon;
    switch (text) {
        case 'baixa':
            classIcon = 'arrow-down text-info';
            break;

        case 'média':
            classIcon = 'arrow-right text-warning';
            break;

        case 'alta':
            classIcon = 'arrow-up text-danger';
            break;
    
        default:
            classIcon = 'arrow-right text-success';
            break;
    }
    return classIcon;
  }

  render() {
    // const { currentIncident, currentIndex } = this.state;
    const { incidents } = this.props;
    console.log('incidents',incidents)

    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-center mb-0">Listagem de Incidentes</h2>
          <div className = "row">
            <Link to={"/add"}>
              <button className="btn btn-primary"> Adicionar Incidente</button>
            </Link>
          </div>
        </div>
        <br></br>
        <div className = "row">
              <table className = "table table-striped table-bordered">

                  <thead>
                      <tr>
                          <th>#</th>
                          <th>Título</th>
                          <th>Descrição</th>
                          <th>Criticidade</th>
                          <th>Tipo</th>
                          <th>Status</th>
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                          incidents.map(
                              (incident, index) => 
                              <tr key = {incident.id}>
                                    <td> { ++index} </td>   
                                    <td> { incident.title} </td>   
                                    <td> {incident.description}</td>
                                    <td>
                                      <div className='d-flex justify-content-between'>
                                          <span>{incident?.criticality ?? 'Não informada'}</span>
                                          <i className={`bi-${this.arrowStatus(incident?.criticality?.toLowerCase()) ?? ''}`}></i>
                                      </div>
                                  </td>
                                    <td>
                                      {incident.type}
                                  </td>
                                    <td> 
                                      <span className={`${incident.status === 0 ? 'bg-danger' : 'bg-primary'} badge`}>
                                          {incident.status === 0 ? 'Inativo' : 'Ativo'}
                                      </span>
                                  </td>
                                    <td width="13%">
                                        <button style={{marginLeft: "10px"}} className="btn btn-success btn-sm"><i className="bi-eye"></i></button>
                                        <button style={{marginLeft: "10px"}} className="btn btn-warning btn-sm"><i className="bi-pencil"></i></button>
                                        <button style={{marginLeft: "10px"}} className="btn btn-danger btn-sm"><i className="bi-trash"></i></button>
                                    </td>
                              </tr>
                          )
                      }
                  </tbody>
              </table>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    incidents: state.incidents,
  };
};


export default connect(mapStateToProps, {
  retrieveIncidents,
  deleteAllIncidents,
})(IncidentsList);