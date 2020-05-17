import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import { PatientDetail } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, addPatientDetail } from '../state';
import EntriesDetail from './EntriesDetail';
import PatientDetailItem from './PatientDetail';
import AddEntryModal from '../AddEntryModal';
import { HealthCheckFormValues } from '../AddEntryModal/HealthCheckEntryForm';


const PatientDescription: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = useState(false);  
  const [{ patientsDetail }, dispatch] = useStateValue();
  const [error, setError] = useState<string>();
  const patient = patientsDetail[id];

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const submit = async (values: HealthCheckFormValues) => {
    console.log('Submitted values ', values);
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patient = await axios.get<PatientDetail>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(addPatientDetail(patient.data));

      } catch (error) {
        setError(error.message);
      }
    };
    if (!patient) {
      fetchPatient();
    }
  }, [patient, dispatch, id]);

  if (error) {
    return <h3 style={{color: 'red'}}>User could not be found.</h3>;
  }

  if (patient) {
    return <div>
      <AddEntryModal 
        onClose={closeModal}
        modelOpen={modalOpen}
        submit={submit}
        error={error}
      />
      <PatientDetailItem patient={patient} />
      <EntriesDetail entries={patient.entries} />
      <div>
        <Button style={{marginTop: 10}} onClick={openModal}>Add New Entry</Button>
      </div>
    </div>;
  }

  return <h3>Patient loading</h3>;
};

export default PatientDescription;
