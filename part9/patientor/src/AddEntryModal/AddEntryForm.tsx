import React from 'react';
import { useStateValue } from '../state';
import { Formik, Field } from 'formik';
import { Form, Button, Grid } from 'semantic-ui-react';
import { TextField, DiagnosisSelection, NumberField } from '../AddPatientModal/FormField';
import { BaseEntry, HealthCheckRating } from '../types';
import { ValidationErrorMessageType } from '../types';

export interface AddEntryFormValues extends Omit<BaseEntry, 'id'> {
  healthCheckRating: HealthCheckRating;
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
  type: "HealthCheck" | "OccupationalHealthcare";
} 

interface Props {
  onSubmit: (values: AddEntryFormValues) => void;
  onCancel: () => void;
  validate: (values: AddEntryFormValues) => ValidationErrorMessageType;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel, validate }) => {
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
    }}
    onSubmit={onSubmit}
    validate={validate}
  >
    {({ isValid, dirty, handleSubmit, setFieldValue, setFieldTouched, values }) => (
      <Form className="form ui" onSubmit={handleSubmit}>

        <Field as="select" name="type">
          <option value="HealthCheck">Health Check</option>
          <option value="OccupationalHealthcare">Occupational Health Care</option>
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
        {values.type === 'HealthCheck'
          ? <Field
            label="Health Check Rating"
            name="healthCheckRating"
            component={NumberField}
            min={0}
            max={3}
          />
          :
          <>
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
          </>
        }
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
