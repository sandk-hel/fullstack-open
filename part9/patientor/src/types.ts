export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  specialist: string;
  date: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export type EntryType =  "HealthCheck" | "OccupationalHealthcare" | "Hospital";

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: { date: string; criteria: string };
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthCareEntry;

interface BasePatient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type Patient = Omit<BasePatient, 'entries'>;
export type PatientDetail = BasePatient;

export type ValidationErrorMessageType = { [field: string]: (
  string | 
  { startDate?: string; endDate?: string } | 
  { date?: string; criteria?: string}
  );
};
