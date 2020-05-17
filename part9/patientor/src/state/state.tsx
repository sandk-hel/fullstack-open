import React, { createContext, useContext, useReducer } from "react";
import { Patient, PatientDetail, Diagnosis } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  patientsDetail: { [id: string]: PatientDetail | undefined };
  diagnoses: Diagnosis[];
};

const initialState: State = {
  patients: {},
  patientsDetail: {},
  diagnoses: []
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);

export const addPatientDetail = (patient: PatientDetail): Action => {
  return {
    type: "ADD_PATIENT_DETAIL",
    payload: patient
  };
};
export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return { 
    type: "SET_PATIENT_LIST", 
    payload: patientListFromApi 
  };
};

export const updatePatient = (patient: PatientDetail): Action => {
  return {
    type: "UPDATE_PATIENT_DETAIL",
    payload: patient
  };
};

export const insertNewPatient = (patient: Patient): Action => {
  return { 
    type: "ADD_PATIENT", 
    payload: patient 
  };
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses
  };
};