import {
    CREATE_INCIDENT,
    RETRIEVE_INCIDENTS,
    UPDATE_INCIDENT,
    DELETE_INCIDENT,
    DELETE_ALL_INCIDENTS,
  } from "../actions/types";
  
  const initialState = [];
  
  function incidentReducer(incidents = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_INCIDENT:
        return [...incidents, payload];
  
      case RETRIEVE_INCIDENTS:
        return payload;
  
      case UPDATE_INCIDENT:
        return incidents.map((incident) => {
          if (incident.id === payload.id) {
            return {
              ...incident,
              ...payload,
            };
          } else {
            return incident;
          }
        });
  
      case DELETE_INCIDENT:
        return incidents.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_INCIDENTS:
        return [];
  
      default:
        return incidents;
    }
  };
  
  export default incidentReducer;