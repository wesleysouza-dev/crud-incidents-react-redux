import React, { Component } from "react";
import { connect } from "react-redux";
import { createIncident } from "../actions/incidents";
import { Link } from "react-router-dom";

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
      id: null,
      title: "",
      description: "",
      criticality: "",
      type: "",
      status: 0,
      submitted: false,
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
  }

  onChangeType = (event) => {
    this.setState({ type: event.target.value }, () => {
      this.validationFields('type');
    });
  }

  onChangeStatus = (event) => {
    const value = event.target.checked ? 1 : 0;
    this.setState({status: value});
  }

  onChangeDescription(e) {
    this.setState({ description: e.target.value }, () => {
      this.validationFields('description');
    });
  }

  componentDidMount() {
    if (!this.state?.id) delete this.state['id'];
    this.alertDisplayMsg('Sucesso!!', 'O Incidente foi cadastrado no sistema!', 'success');
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
    
  // }

 async saveIncident(e) {
    e.preventDefault();

    const { title, criticality, type, status, description } = this.state;
    
    const validations = await this.validationFields();
    if (!validations) return false

    this.props
      .createIncident(title, criticality, type, status, description)
      .then((data) => {
        this.setState({
          id: data?.id,
          title: data.title,
          criticality: data.criticality,
          type: data.type,
          status: data.status,
          description: data.description,
          submitted: true,
        });
        this.alertDisplayMsg('Sucesso!!', 'O Incidente foi cadastrado no sistema!', 'success');
        this.resetIncident();
      })
      .catch((e) => {
        console.log('errors', e);
        this.alertDisplayMsg('Erro!!', 'Não conseguimos cadastrar o incidente no momento, volte mais tarde!', 'danger');
      });
  }

  resetIncident() {
    this.setState({
      title: "",
      description: "",
      criticality: "",
      type: "",
      status: 0,
      submitted: false,
    });
  }

  getTitle(){
    if(!this.state.id){
        return <h3 className="text-center">Adicionar Incidente</h3>
    }else{
        return <h3 className="text-center">Atualizar Incidente</h3>
    }
  }

  getStatusDisplay() {
    return this.state?.status === 0 ? 'Inativo' : 'Ativo';
  }

  alertDisplayMsg(title, msg, type) {
    const element = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
      <strong>${title}</strong> ${msg}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    const msgAlert = document.querySelector('.msg-alert');
    msgAlert.innerHTML = element;
    msgAlert.classList.add('animate');
    console.log(window.getComputedStyle(msgAlert,':before'));

    const myAlert = document.querySelector('.btn-close');
    myAlert.addEventListener('click', () => {
      msgAlert.innerHTML = ''
    })

    setTimeout(() => {
      document.querySelector('.alert-dismissible').remove();
    }, 5000);
  }

  validationFields = (fieldName = null) => {
    const incident = this.state;
    const arrObj = Object.values(this.state);
    const errors = [];

    // single field validation
    if (fieldName && incident[fieldName].length < 1) {
      const element = document.querySelector(`form [name='${fieldName}']`)
      element?.classList.add('is-invalid')
      return false
    }

    // all fields validation 
    if (!fieldName && (arrObj.includes('') || arrObj.includes(null))) {
      for (const item in incident) {
        const element = document.querySelector(`form [name='${item}']`)
        if (incident[item] === '' || incident[item] === null) {
            element?.classList.add('is-invalid')
            errors.push(item);
        } else {
          element?.classList.remove('is-invalid')
        }
      }
      if (errors.length > 0) return false
    }
    const element = document.querySelector(`form [name='${fieldName}']`)
    element?.classList.remove('is-invalid')
    return true
  }
     
  render() {
    return (
      <div className="submit-form mt-5">
          <div className="msg-alert"></div>
          <div className="card col-md-6 offset-md-3 offset-md-3 py-4">
            {this.getTitle()}
            <div className = "card-body">
                <form>
                    <div className = "form-group mb-2">
                        <label className="form-label"> Título: </label>
                        <div className="input-group has-validation">
                            <input 
                                placeholder="Digite seu título" 
                                name="title" 
                                className="form-control" 
                                value={this.state.title} 
                                onChange={this.onChangeTitle}/>
                            <div className="invalid-feedback">
                                Digite um título
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className = "form-group my-2">
                                <label className="form-label"> Criticidade: </label>
                                <div className="input-group has-validation">
                                    <select name="criticality" className="form-select" value={this.state.criticality}
                                        onChange={this.onChangeCriticality}>
                                            <option value="">Selecione uma opção</option>
                                            <option value="Alta">Alta</option>
                                            <option value="Média">Média</option>
                                            <option value="Baixa">Baixa</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Selecione uma Criticidade
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className = "form-group my-2">
                                <label className="form-label"> Tipo: </label>
                                <div className="input-group has-validation">
                                    <select name="type" className="form-select" value={this.state.type}
                                        onChange={this.onChangeType}>
                                            <option value="">Selecione uma opção</option>
                                            <option value="Alarme">Alarme</option>
                                            <option value="Incidente">Incidente</option>
                                            <option value="Outros">Outros</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Selecione um Tipo
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                    <div className="form-group mt-2 mb-4">
                        <label className="form-label"> Status: </label>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="switchStatus" name="status" checked={this.state.status === 1 ? true : false} onChange={this.onChangeStatus} />
                            <label className="form-check-label"><span>{this.getStatusDisplay()}</span></label>
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
                            onChange={this.onChangeDescription}>{this.state.description}</textarea>
                            <div className="invalid-feedback">
                                Escreva uma Descrição
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-success" onClick={this.saveIncident}>Cadastrar</button>
                    <Link to={"/"}>
                        <button className="btn btn-danger" style={{marginLeft: "10px"}}>Cancelar</button>
                    </Link>
                </form>
            </div>
          </div>
      </div>
    );
  }
}

export default connect(null, { createIncident })(AddIncident);