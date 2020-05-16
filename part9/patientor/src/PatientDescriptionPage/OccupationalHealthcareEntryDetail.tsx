import React from 'react';
import { Icon } from 'semantic-ui-react';
import { OccupationalHealthCareEntry } from '../types';
import DiagnosisCodeDetails from './DiagnosisCodeDetails';

const OccupationalHealthCareEntryDetail: React.FC<{entry:  OccupationalHealthCareEntry}> = ({ entry }) => {
  return <div className="ui segment" key={entry.id}>
  <h2>{entry.date} <Icon name="stethoscope" />{entry.employerName}</h2>
  <p><i>{entry.description}</i></p>
  <DiagnosisCodeDetails codes={entry.diagnosisCodes} />
</div>
}

export default OccupationalHealthCareEntryDetail;
