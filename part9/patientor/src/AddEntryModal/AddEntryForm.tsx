import React from 'react';
import { useStateValue } from '../state';
import { Formik, Field } from 'formik';
import { Form, Button, Grid } from 'semantic-ui-react';
import { TextField, DiagnosisSelection, NumberField } from '../AddPatientModal/FormField';
import { BaseEntry, HealthCheckRating, ValidationErrorMessageType, EntryType} from '../types';

export interface AddEntryFormValues extends Omit<BaseEntry, 'id'> {
  healthCheckRating: HealthCheckRating;
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
  discharge: { date: string; criteria: string };
  type: EntryType;
} 

interface Props {
  onSubmit: (values: AddEntryFormValues) => void;
  onCancel: () => void;
  validate: (values: AddEntryFormValues) => ValidationErrorMessageType;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel, validate }) => {

  const typeSpecificFormFields = (type:  EntryType) => {
    switch (type) {
      case "HealthCheck": 
        return  <Field
        label="Health Check Rating"
        name="healthCheckRating"
        component={NumberField}
        min={0}
        max={3}
      />;
    case "OccupationalHealthcare":
      return <>
      <Field
        label='Employer'
        placeholder='employer'
        name='employerName'
        component={TextField}
      />
      <Field
        label="Sick leave start"
        placeholder="YYYY-MM-DD"
        name="sickLeave.startDate"
        component={TextField}
      />
      <Field
        label="Sick leave end"
        placeholder="YYYY-MM-DD"
        name="sickLeave.endDate"
        component={TextField}
      />
    </>;
    case "Hospital":
      return <>
        <Field
        label="Discharge date"
        placeholder="YYYY-MM-DD"
        name="discharge.date"
        component={TextField}
      />
        <Field
        label='Discharge Criteria'
        placeholder='discharge criteria'
        name='discharge.criteria'
        component={TextField}
      />
      </>;
    }
  };

  const [{ diagnoses }] = useStateValue();
  return <Formik
    initialValues={{
      healthCheckRating: 0,
      employerName: "",
      sickLeave: {startDate: "", endDate: ""},
      description: "",
      specialist: "",
      date: "",
      diagnosisCodes: [],
      type: "HealthCheck",
      discharge: {date: "", criteria: ""},
    }}
    onSubmit={onSubmit}
    validate={validate}>
    {({ isValid, dirty, handleSubmit, setFieldValue, setFieldTouched, values }) => (
      <Form className="form ui" onSubmit={handleSubmit}>
        <Field as="select" name="type">
          <option value="HealthCheck">Health Check</option>
          <option value="OccupationalHealthcare">Occupational Health Care</option>
          <option value="Hospital">Hospital</option>
        </Field>
        <Field
          label='Description'
          placeholder='Description'
          name='description'
          component={TextField}
        />
        <Field
          label='Specialist'
          placeholder='specialist'
          name='specialist'
          component={TextField}
        />
        <Field
          label="Date"
          placeholder="YYYY-MM-DD"
          name="date"
          component={TextField}
        />
        <DiagnosisSelection
          diagnoses={Object.values(diagnoses)}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched} />
          {typeSpecificFormFields(values.type)}
        <Grid>
          <Grid.Column floated="left">
            <Button type="cancel"
              color="red"
              floated="left"
              onClick={onCancel}>
              Cancel
          </Button>
          </Grid.Column>
          <Grid.Column floated="right">
            <Button type="submit"
              color="green"
              floated="right"
              disabled={!dirty || !isValid}>
              Add
          </Button>
          </Grid.Column>
        </Grid>
      </Form>
    )}
  </Formik>;
};
export default AddEntryForm;
