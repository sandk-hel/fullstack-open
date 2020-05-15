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

export interface Entry {

}

interface BasePatient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entry: Entry[]
}

export type Patient = Omit<BasePatient, 'entry'> 
export type PatientDetail = BasePatient