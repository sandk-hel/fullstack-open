import React from 'react';
import { HospitalEntry } from '../types';
import { Icon } from 'semantic-ui-react';
import DiagnosisCodeDetails from './DiagnosisCodeDetails';

const HospitalEntryDetail: React.FC<{entry:  HospitalEntry}> = ({ entry }) => {
  return <div className="ui segment" key={entry.id}>
  <h2>{entry.date} <Icon name="hospital" /></h2>
  <p><i>{entry.description}</i></p>
  <DiagnosisCodeDetails codes={entry.diagnosisCodes} />
</div>;
};

export default HospitalEntryDetail;
