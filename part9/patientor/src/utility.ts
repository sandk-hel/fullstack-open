/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddEntryFormValues } from "./AddEntryModal/AddEntryForm";
import {
  OccupationalHealthCareEntry,
  HealthCheckEntry,
  BaseEntry,
  HealthCheckRating,
  ValidationErrorMessageType,
  HospitalEntry,
} from "./types";

const requiredError = "Field is required";

type NewOccupationHealthCareEntry = Omit<OccupationalHealthCareEntry, "id">;
type NewHealthCheckEntry = Omit<HealthCheckEntry, "id">;
type NewHospitalEntry = Omit<HospitalEntry, "id">;

export type NewEntryType =
  | NewOccupationHealthCareEntry
  | NewHealthCheckEntry
  | NewHospitalEntry;

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (text: any): boolean => {
  return Boolean(Date.parse(text));
};

export const toNewEntryType = (
  entryFormValues: AddEntryFormValues
): NewEntryType => {
  const {
    healthCheckRating,
    employerName,
    sickLeave,
    discharge,
    ...basicEntries
  } = entryFormValues;
  switch (entryFormValues.type) {
    case "HealthCheck":
      return { healthCheckRating, ...basicEntries, type: "HealthCheck" };

    case "OccupationalHealthcare":
      return {
        employerName,
        sickLeave,
        ...basicEntries,
        type: "OccupationalHealthcare",
      };
    case "Hospital":
      return { discharge, ...basicEntries, type: "Hospital" };
  }
};

const validateBasicEntries = (
  entryValues: Omit<BaseEntry, "id">
): ValidationErrorMessageType => {
  const errors: ValidationErrorMessageType = {};
  if (!entryValues.description) {
    errors.description = requiredError;
  }

  if (!entryValues.specialist) {
    errors.specialist = requiredError;
  }

  if (!entryValues.date || !isString(entryValues.date)) {
    errors.date = requiredError;
  }

  if (!isDate(entryValues.date)) {
    errors.date = "Invalid date";
  }

  return errors;
};

export const validateHealthCheckEntries = (entries: {
  healthCheckRating: number;
}): ValidationErrorMessageType => {
  const errors: ValidationErrorMessageType = {};
  if (entries.healthCheckRating === undefined) {
    errors.healthCheckRating = requiredError;
  }

  if (!Object.values(HealthCheckRating).includes(entries.healthCheckRating)) {
    errors.healthCheckRating = "Invalid health check rating";
  }

  return errors;
};

export const validateOccupationalHealthCareEntry = (entries: {
  employerName: string;
  sickLeave: { startDate: string; endDate: string } | undefined;
}): ValidationErrorMessageType => {
  const errors: ValidationErrorMessageType = {};
  if (!entries.employerName) {
    errors.employerName = requiredError;
  }

  // If startDate and endDate are empty leave them
  // since they are optional field but if only one is present both are required
  // see validations below
  if (
    !entries.sickLeave ||
    (entries.sickLeave?.startDate.length === 0 &&
      entries.sickLeave?.endDate.length === 0)
  ) {
    return errors;
  }

  const dateErrors: { startDate?: string; endDate?: string } = {};
  if (!isDate(entries.sickLeave.startDate)) {
    dateErrors.startDate = "Invalid start date";
  }

  if (!isDate(entries.sickLeave.startDate)) {
    dateErrors.endDate = "Invalid end date";
  }

  if (dateErrors.startDate || dateErrors.endDate) {
    errors.sickLeave = dateErrors;
  }
  return errors;
};

export const validateHospitalEntries = (discharge: {
  date: string;
  criteria: string;
}): ValidationErrorMessageType => {
  const errors: ValidationErrorMessageType = {};
  const dischargeErrors: { date?: string; criteria?: string } = {};

  if (!isString(discharge.date) || !isDate(discharge.date)) {
    dischargeErrors.date = "Invalid discharge date";
  }
  
  if (!discharge.criteria) {
    dischargeErrors.criteria = requiredError;
  }

  if (dischargeErrors.criteria || dischargeErrors.date) {
    errors.discharge = dischargeErrors;
  }
  return errors;
};

export const validate = (
  entryFormValues: AddEntryFormValues
): ValidationErrorMessageType => {
  const {
    healthCheckRating,
    employerName,
    sickLeave,
    discharge,
    ...basicEntries
  } = entryFormValues;

  switch (entryFormValues.type) {
    case "HealthCheck":
      return {
        ...validateHealthCheckEntries({ healthCheckRating }),
        ...validateBasicEntries(basicEntries),
      };
    case "OccupationalHealthcare":
      return {
        ...validateOccupationalHealthCareEntry({ employerName, sickLeave }),
        ...validateBasicEntries(basicEntries),
      };
    case "Hospital":
      return {
        ...validateHospitalEntries(discharge),
        ...validateBasicEntries(basicEntries),
      };
  }
};
