import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retrieveIncidents, deleteIncident } from '../actions/incidents';
import { Link } from 'react-router-dom';
import { notification, defineIconStatus, limitCharacter } from '../utils';

class IncidentsList extends Component {
  constructor(props) {
    super(props);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.removeIncident = this.removeIncident.bind(this);
  }

  componentDidMount() {
    this.props.retrieveIncidents();
  }

  removeIncident(id) {
    this.props
      .deleteIncident(id)
      .then((response) => {
        console.log(response);
        notification('O Incidente foi excluído do sistema!', 'success');
        this.props.retrieveIncidents();
      })
      .catch((e) => {
        notification(
          'Oops! Não foi possível excluir o registro. Tente novamente mais tarde!',
          'error',
        );
        console.log('erro', e);
      });
  }

  arrowStatus(text) {
    return defineIconStatus(text);
  }

  confirmDelete(e) {
    const idDelete = e?.currentTarget?.getAttribute('data-id');

    if (window.confirm(`Tem certeza que deseja excluir?`)) {
      this.removeIncident(idDelete);
    }
  }

  render() {
    // const { currentIncident, currentIndex } = this.state;
    const { incidents } = this.props;

    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-center mb-0">Listagem de Incidentes</h2>
          <div className="row">
            <Link to={'/add'}>
              <button className="btn btn-primary"> Adicionar Incidente</button>
            </Link>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-12">
            <table className="table table-striped table-bordered">
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
                {incidents.map((incident, index) => (
                  <tr key={incident.id ?? index} data-id={incident.id}>
                    <td> {++index} </td>
                    <td> {incident.title} </td>
                    <td> {limitCharacter(incident.description, 50)}</td>
                    <td>
                      <div className="d-flex justify-content-between">
                        <span>{incident?.criticality ?? 'Não informada'}</span>
                        <i
                          className={`bi-${
                            this.arrowStatus(incident?.criticality?.toLowerCase()) ?? ''
                          }`}
                        ></i>
                      </div>
                    </td>
                    <td>{incident.type}</td>
                    <td>
                      <span
                        className={`${incident.status === 0 ? 'bg-danger' : 'bg-primary'} badge`}
                      >
                        {incident.status === 0 ? 'Inativo' : 'Ativo'}
                      </span>
                    </td>
                    <td width="13%">
                      <Link
                        to={'/incident/' + incident.id}
                        style={{ marginLeft: '10px' }}
                        className="btn btn-success btn-sm"
                        title="Visualizar"
                      >
                        <i className="bi-eye"></i>
                      </Link>
                      <Link
                        to={'/edt/' + incident.id}
                        style={{ marginLeft: '10px' }}
                        className="btn btn-warning btn-sm"
                        title="Editar"
                      >
                        <i className="bi-pencil"></i>
                      </Link>
                      <button
                        title="Excluir"
                        style={{ marginLeft: '10px' }}
                        className="btn btn-danger btn-sm"
                        data-id={incident.id}
                        onClick={this.confirmDelete}
                      >
                        <i className="bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
  deleteIncident,
})(IncidentsList);
