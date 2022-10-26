import axios from 'axios';
const INCIDENT_API_BASE_URL = "http://localhost:8989/api/incidents";

class IncidentDataService {
  getAll() {
    return axios.get(INCIDENT_API_BASE_URL);
  }

  get(id) {
    return axios.get(`${INCIDENT_API_BASE_URL}/${id}`);
  }

  create(data) {
    return axios.post(INCIDENT_API_BASE_URL, data);
  }

  update(id, data) {
    return axios.put(`${INCIDENT_API_BASE_URL}/${id}`, data);
  }

  delete(id) {
    return axios.delete(`${INCIDENT_API_BASE_URL}/${id}`);
  }

  deleteAll() {
    return axios.delete(INCIDENT_API_BASE_URL);
  }
}

export default new IncidentDataService();