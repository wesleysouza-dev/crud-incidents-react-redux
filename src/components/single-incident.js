import React, { Component } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import IncidentDataService from "../services/incident";
import { Link } from "react-router-dom";
import { defineIconStatus } from "../utils";

function withParams(Component) {
return props => <Component {...props} params={useParams()} />;
}

class Incident extends Component {
  constructor(props) {
    super(props);
    this.getIncident = this.getIncident.bind(this);

    this.state = {
      currentIncident: {
        id: null,
        title: "",
        description: "",
        criticality: "",
        type: "",
        status: "",
      },
    };
  }

  componentDidMount() {
    this.getIncident(this.props.params?.id);
  }

  getIncident(id) {
    IncidentDataService.get(id)
      .then((response) => {
        this.setState({
          currentIncident: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log('erro', e);
        this.setState({
            currentIncident: {}
        })
      });
  }

  arrowStatus(text) {
    return defineIconStatus(text);
  }

  render() {
    const { currentIncident } = this.state;

    return (
      <div>
        {Object.keys(currentIncident).length > 0 ? (
            <div className="mt-5">
                <div className="card">
                    <h5 className="card-header d-flex justify-content-between">
                        {currentIncident.title}
                        <span className="ml-5">
                            #{currentIncident.id}
                        </span>
                    </h5>
                    <div className="card-body">
                        <h5 className="card-title">

                            <span className="badge bg-dark">
                                <span className="text-small-10 d-block text-start">Status</span>
                                <span>{currentIncident?.criticality ?? 'Não informado'}</span>
                                <i className={`bi-${this.arrowStatus(currentIncident?.criticality?.toLowerCase()) ?? ''} ms-2`}></i>
                            </span>

                            <span className={`${currentIncident.status === 0 ? 'bg-danger' : 'bg-primary'} badge mx-2`}>
                                <span className="text-small-10 d-block text-start">Status</span>
                                {currentIncident.status === 0 ? 'Inativo' : 'Ativo'}
                            </span>

                            <span className="badge bg-info">
                                <span className="text-small-10 d-block text-start">Tipo</span>
                                {currentIncident.type}
                            </span>
                            
                        </h5>
                        <p className="card-text">{currentIncident.description}</p>
                    </div>
                </div>
            </div>
        ) : (
          <div>
            <br />
            <h3 class="text-center">Incidente não encontrado...</h3>
          </div>
        )}
        <div className="text-center mt-5">
            <Link to={'/'} className="btn btn-outline-secondary">
                <i className="bi-arrow-left me-2"></i>
                <span>Voltar</span>
            </Link>
        </div>
      </div>
    );
  }
}

export default connect(null, {})(withParams(Incident));