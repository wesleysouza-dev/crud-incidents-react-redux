import {
    CREATE_INCIDENT,
    RETRIEVE_INCIDENTS,
    UPDATE_INCIDENT,
    DELETE_INCIDENT,
  } from "./types";
  
  import IncidentDataService from "../services/incident";
  
  export const createIncident = (title, criticality, type, status, description) => async (dispatch) => {
    try {
      const res = await IncidentDataService.create({ title, criticality, type, status, description });
  
      dispatch({
        type: CREATE_INCIDENT,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveIncidents = () => async (dispatch) => {
    try {
      const res = await IncidentDataService.getAll();
  
      dispatch({
        type: RETRIEVE_INCIDENTS,
        payload: res.data?.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateIncident = (id, data) => async (dispatch) => {
    try {
      const res = await IncidentDataService.update(id, data);
  
      dispatch({
        type: UPDATE_INCIDENT,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteIncident = (id) => async (dispatch) => {
    try {
      await IncidentDataService.delete(id);
  
      dispatch({
        type: DELETE_INCIDENT,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  };