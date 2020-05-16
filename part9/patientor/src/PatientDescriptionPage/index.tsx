import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PatientDetail } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, addPatientDetail } from '../state';
import EntriesDetail from './EntriesDetail';
import PatientDetailItem from './PatientDetail';

const PatientDescription: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientsDetail }, dispatch] = useStateValue();
  const [error, setError] = useState<string>();
  const patient = patientsDetail[id];

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patient = await axios.get<PatientDetail>(
          `${apiBaseUrl}/patients/${id}`
        )
        dispatch(addPatientDetail(patient.data))

      } catch (error) {
        setError(error.message);
      }
    }
    if (!patient) {
      fetchPatient()
    }
  }, [patient, dispatch, id]);

  if (error) {
    return <h3 style={{color: 'red'}}>User could not be found.</h3>;
  }

  if (patient) {
    return <div>
      <PatientDetailItem patient={patient} />
      <EntriesDetail entries={patient.entries} />
    </div>
  }

  return <h3>Patient loading</h3>;
}

export default PatientDescription;