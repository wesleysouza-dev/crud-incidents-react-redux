import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createIncident, updateIncident } from '../actions/incidents';
import { Link } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { notification } from '../utils';
import IncidentDataService from '../services/incident';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}
class AddIncident extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeCriticality = this.onChangeCriticality.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveIncident = this.saveIncident.bind(this);
    this.resetIncident = this.resetIncident.bind(this);

    this.state = {
      id: this.props.params.id ?? null,
      title: '',
      description: '',
      criticality: '',
      type: '',
      status: 0,
    };
  }

  onChangeTitle(event) {
    this.setState({ title: event.target.value }, () => {
      this.validationFields('title');
    });
  }

  onChangeCriticality = async (event) => {
    this.setState({ criticality: event.target.value }, () => {
      this.validationFields('criticality');
    });
  };

  onChangeType = (event) => {
    this.setState({ type: event.target.value }, () => {
      this.validationFields('type');
    });
  };

  onChangeStatus = (event) => {
    const value = event.target.checked ? 1 : 0;
    this.setState({ status: value });
  };

  onChangeDescription(e) {
    this.setState({ description: e.target.value }, () => {
      this.validationFields('description');
    });
  }

  componentDidMount() {
    if (!this.state?.id) {
      delete this.state['id'];
      return;
    }
    this.getIncident(this.state?.id);
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.params !== this.props.params) return this.resetIncident();
  }

  getIncident(id) {
    IncidentDataService.get(id)
      .then((response) => {
        this.setState(response.data);
        // notification('Incidente carregado com sucesso!', 'success');
      })
      .catch((e) => {
        console.log('erro', e);
        this.resetIncident();
        notification('Oops! Não foi possível carregar o incidente no momento!', 'error');
      });
  }

  async saveIncident(e) {
    e.preventDefault();

    const validations = await this.validationFields();
    if (!validations) return false;

    const btnSave = document.querySelector('.btn-save');
    btnSave.disabled = true;

    !this.state.id || this.state.id === null
      ? this.createIncidentForm(btnSave)
      : this.updateIncidentForm(this.state.id, this.state, btnSave);
  }

  createIncidentForm(btn) {
    console.log('create');
    this.props
      .createIncident(this.state)
      .then((data) => {
        this.setState(data);
        notification('O Incidente foi cadastrado no sistema!', 'success');
        this.resetIncident();
      })
      .catch((e) => {
        const msg =
          e?.response?.data?.message ?? `Não foi possível cadastrar no momento. Volte mais tarde!`;
        console.log('errors', e);
        notification(`Oops! ${msg}`, 'error');
      })
      .finally((e) => {
        btn.disabled = false;
      });
  }

  updateIncidentForm(id, dataState, btn) {
    this.props
      .updateIncident(id, dataState)
      .then((data) => {
        this.setState({ data });
        notification('O Incidente foi atualizado com sucesso!', 'success');
      })
      .catch((e) => {
        const msg =
          e?.response?.data?.message ?? `Não foi possível atualizar no momento. Tente mais tarde!`;
        console.log('errors', e);
        notification(`Oops! ${msg}`, 'error');
      })
      .finally(() => {
        btn.disabled = false;
      });
  }

  resetIncident() {
    this.setState({
      id: null,
      title: '',
      description: '',
      criticality: '',
      type: '',
      status: 0,
    });
  }

  getTitle() {
    if (!this.state.id) {
      return <h3 className="text-center">Adicionar Incidente</h3>;
    } else {
      return <h3 className="text-center">Atualizar Incidente #{this.state.id}</h3>;
    }
  }

  getStatusDisplay() {
    return this.state?.status === 0 ? 'Inativo' : 'Ativo';
  }

  validationFields = (fieldName = null) => {
    const incident = this.state;
    const { id, ...rest } = this.state;
    const arrObj = Object.values(rest);
    const errors = [];

    // single field validation
    if (fieldName && incident[fieldName].length < 1) {
      const element = document.querySelector(`form [name='${fieldName}']`);
      element?.classList.add('is-invalid');
      return false;
    }

    // all fields validation
    if (!fieldName && (arrObj.includes('') || arrObj.includes(null))) {
      for (const item in incident) {
        const element = document.querySelector(`form [name='${item}']`);
        if (incident[item] === '' || incident[item] === null) {
          element?.classList.add('is-invalid');
          errors.push(item);
        } else {
          element?.classList.remove('is-invalid');
        }
      }
      if (errors.length > 0) return false;
    }
    const element = document.querySelector(`form [name='${fieldName}']`);
    element?.classList.remove('is-invalid');
    return true;
  };

  render() {
    return (
      <div className="submit-form mt-5">
        <NotificationContainer />
        <div className="card col-md-6 offset-md-3 offset-md-3 py-4">
          {this.getTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label"> Título: </label>
                <div className="input-group has-validation">
                  <input
                    placeholder="Digite seu título"
                    name="title"
                    className="form-control"
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                  />
                  <div className="invalid-feedback">Digite um título</div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group my-2">
                    <label className="form-label"> Criticidade: </label>
                    <div className="input-group has-validation">
                      <select
                        name="criticality"
                        className="form-select"
                        value={this.state.criticality}
                        onChange={this.onChangeCriticality}
                      >
                        <option value="">Selecione uma opção</option>
                        <option value="Alta">Alta</option>
                        <option value="Média">Média</option>
                        <option value="Baixa">Baixa</option>
                      </select>
                      <div className="invalid-feedback">Selecione uma Criticidade</div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="form-group my-2">
                    <label className="form-label"> Tipo: </label>
                    <div className="input-group has-validation">
                      <select
                        name="type"
                        className="form-select"
                        value={this.state.type}
                        onChange={this.onChangeType}
                      >
                        <option value="">Selecione uma opção</option>
                        <option value="Alarme">Alarme</option>
                        <option value="Incidente">Incidente</option>
                        <option value="Outros">Outros</option>
                      </select>
                      <div className="invalid-feedback">Selecione um Tipo</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group mt-2 mb-4">
                <label className="form-label"> Status: </label>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="switchStatus"
                    name="status"
                    checked={this.state.status === 1 ? true : false}
                    onChange={this.onChangeStatus}
                  />
                  <label className="form-check-label">
                    <span>{this.getStatusDisplay()}</span>
                  </label>
                </div>
              </div>

              <div className="form-group mt-2 mb-4">
                <label className="form-label"> Descrição: </label>
                <div className="input-group has-validation">
                  <textarea
                    placeholder="Digite sua descrição"
                    name="description"
                    className="form-control"
                    rows="5"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                  >
                    {this.state.description}
                  </textarea>
                  <div className="invalid-feedback">Escreva uma Descrição</div>
                </div>
              </div>

              <button className="btn btn-success btn-save" onClick={this.saveIncident}>
                {this.state?.id ? 'Atualizar' : 'Cadastrar'}
              </button>
              <Link
                to={'/'}
                type="button"
                className="btn btn-danger"
                style={{ marginLeft: '10px' }}
              >
                {this.state?.id ? 'Voltar' : 'Cancelar'}
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { createIncident, updateIncident })(withParams(AddIncident));
