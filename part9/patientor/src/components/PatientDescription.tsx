import React, { useEffect } from 'react';
import { Icon, SemanticICONS } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PatientDetail, Gender } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, addPatientDetail } from '../state';

const PatientDescription: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientsDetail }, dispatch] = useStateValue();

  const patient = patientsDetail[id];
  const genderIcon = (): SemanticICONS => {
    if (patient?.gender === undefined) {
      return "genderless"
    }

    if (patient.gender === Gender.Male) {
      return "venus"
    }

    if  (patient.gender === Gender.Female) {
      return "mercury"
    }

    return "neuter"
  }

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await axios.get<PatientDetail>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(addPatientDetail(patient.data))
    }
    if (!patient) {
      fetchPatient()
    }
  }, [patient, dispatch, id]);

  if (patient) {
    return <div>
      <h2>{patient.name} <Icon name={genderIcon()} /></h2> 
      <p>
        ssn: {patient.ssn} <br />
        occupation: {patient.occupation}
      </p>
    </div>
  }
  return <h3>Patient loading</h3>;
}

export default PatientDescription;