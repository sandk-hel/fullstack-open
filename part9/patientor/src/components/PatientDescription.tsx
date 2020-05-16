import React, { useEffect, useState } from 'react';
import { Icon, SemanticICONS } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PatientDetail, Gender } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, addPatientDetail } from '../state';

const PatientDescription: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientsDetail, diagnoses }, dispatch] = useStateValue();
  const [error, setError] = useState<string>();

  const patient = patientsDetail[id];
  const genderIcon = (): SemanticICONS => {
    if (patient?.gender === undefined) {
      return "genderless"
    }

    if (patient.gender === Gender.Male) {
      return "venus"
    }

    if (patient.gender === Gender.Female) {
      return "mercury"
    }
    return "neuter"
  }

  const showEntries = () => {
    if (!patient) {
      return null;
    }

    return patient.entries.map(entry => {
      return <div key={entry.id}>
          <p><i>{entry.date} {entry.description}</i></p>
          <ul>
            {entry.diagnosisCodes?.map(code => diagnosisElement(code))}
          </ul>
        </div>
    })
  }

  const diagnosisElement = (code: string) => {
    const diag = diagnoses.find(d => d.code === code)
    if (!diag) {
      return <li key={code}>{code}</li>
    }
    return  <li key={code}>{code} {diag.name}</li>
  }

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
      <h2>{patient.name} <Icon name={genderIcon()} /></h2>
      <p>
        ssn: {patient.ssn} <br />
        occupation: {patient.occupation}
      </p>
      {showEntries()}
    </div>
  }

  return <h3>Patient loading</h3>;
}

export default PatientDescription;