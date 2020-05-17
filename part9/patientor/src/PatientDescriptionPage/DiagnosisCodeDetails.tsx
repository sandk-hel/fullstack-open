import React from 'react';
import { useStateValue } from '../state';

const DiagnosisCodeDetails: React.FC<{codes?: string[]}> = ({ codes }) => {
  const [{ diagnoses }] = useStateValue();

  if (!codes) {
    return null;
  }

  const diagnosisElement = (code: string) => {
    const diag = diagnoses.find(d => d.code === code);
    if (!diag) {
      return <li key={code}>{code}</li>;
    }
    return  <li key={code}>{code} {diag.name}</li>;
  };

  return  <div>{codes.map(code => diagnosisElement(code))}</div>;
};

export default DiagnosisCodeDetails;
