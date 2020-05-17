import React from 'react';
import { useStateValue } from '../state';
import { Formik, Field } from 'formik';
import { Form, Button, Grid } from 'semantic-ui-react';
import { TextField, DiagnosisSelection, NumberField } from '../AddPatientModal/FormField';
import { HealthCheckEntry } from '../types';

export type HealthCheckFormValues = Omit<HealthCheckEntry, 'id'>;

interface Props {
  onSubmit: (values: HealthCheckFormValues) => void;
  onCancel: () => void;
}

export const HealthCheckEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  return <Formik
      initialValues={{
        healthCheckRating: 0,
        description: "",
        specialist: "",
        date: "",
        diagnosisCodes: [],
        type: "HealthCheck"
        }}
    onSubmit={onSubmit}
   validate={ () => ({})}
    >
    {({ isValid, dirty, handleSubmit, setFieldValue, setFieldTouched }) => (
    <Form className="form ui" onSubmit={handleSubmit}>
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
        <Field
          label="Health Check Rating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
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
export default HealthCheckEntryForm;