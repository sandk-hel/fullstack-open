import React from 'react';
import { Patient, Gender } from '../types';
import { Icon, SemanticICONS } from 'semantic-ui-react';

const PatientDetail: React.FC<{ patient: Patient }> = ({ patient }) => {
  const genderIcon = (): SemanticICONS => {
    if (patient?.gender === undefined) {
      return "genderless";
    }

    if (patient.gender === Gender.Male) {
      return "venus";
    }

    if (patient.gender === Gender.Female) {
      return "mercury";
    }
    return "neuter";
  };
  return <>
    <h2>{patient.name} <Icon name={genderIcon()} /></h2>
    <p>
      ssn: {patient.ssn} <br />
      occupation: {patient.occupation}
    </p>
  </>;
};

export default PatientDetail;
