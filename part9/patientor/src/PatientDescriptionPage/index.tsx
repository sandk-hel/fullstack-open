import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import { PatientDetail } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, addPatientDetail, updatePatient } from '../state';
import EntriesDetail from './EntriesDetail';
import PatientDetailItem from './PatientDetail';
import AddEntryModal from '../AddEntryModal';
import { AddEntryFormValues } from '../AddEntryModal/AddEntryForm';
import { toNewEntryType, validate } from '../utility';


const PatientDescription: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = useState(false);  
  const [{ patientsDetail }, dispatch] = useStateValue();
  const [error, setError] = useState<string>();
  const patient = patientsDetail[id];

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setError(undefined);
    setModalOpen(false);
  };

  const submit = async (values: AddEntryFormValues) => {
    try {
      const newEntryTypes = toNewEntryType(values);
      const response = await axios.post<PatientDetail>(
        `${apiBaseUrl}/patients/${id}/entries`,
        newEntryTypes
      );
      dispatch(updatePatient(response.data));
      closeModal();
    } catch (exception) {
      setError(exception.response.data.error);
    }
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

  if (patient) {
    return <>
     { error 
      ? <h3 style={{color: 'red'}}>{error}</h3>
      : null
     }
    <div>
      <AddEntryModal 
        onClose={closeModal}
        modelOpen={modalOpen}
        submit={submit} 
        validate={validate}
        error={error}
      />
      <PatientDetailItem patient={patient} />
      <EntriesDetail entries={patient.entries} />
      <div>
        <Button style={{marginTop: 10}} onClick={openModal}>Add New Entry</Button>
      </div>
    </div>
    </>;
  }

  if (error) {
    return <h3 style={{color: 'red'}}>{error}</h3>;
  }

  return <h3>Patient loading</h3>;
};

export default PatientDescription;
