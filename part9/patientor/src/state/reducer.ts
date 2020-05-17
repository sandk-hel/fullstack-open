import { State } from "./state";
import { Patient, PatientDetail, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_DETAIL";
      payload: PatientDetail;
    }
  | {
      type: "UPDATE_PATIENT_DETAIL";
      payload: PatientDetail;
    }
  | {
    type: "SET_DIAGNOSES";
    payload: Diagnosis[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT_DETAIL":
      return {
        ...state, 
        patientsDetail: {
          ...state.patientsDetail,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT_DETAIL":
      const tempState = {
        ...state,
        patientsDetail: {
          ...state.patientsDetail,
          [action.payload.id]: action.payload
        }
      };
      console.log(tempState);
      return tempState;

    case "SET_DIAGNOSES":
      return {
        ...state, 
        diagnoses: action.payload
      };
    default:
      return state;
  }
};
