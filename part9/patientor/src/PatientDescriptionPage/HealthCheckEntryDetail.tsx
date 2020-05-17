import React from 'react';
import { HealthCheckEntry, HealthCheckRating } from '../types';
import { Icon, SemanticCOLORS } from 'semantic-ui-react';
import DiagnosisCodeDetails from './DiagnosisCodeDetails';

const HealthCheckEntryDetail: React.FC<{entry: HealthCheckEntry}> = ({ entry }) => {
  const healthRatingColor = (): SemanticCOLORS => {
    if (entry.healthCheckRating === HealthCheckRating.Healthy) {
      return "green";
    }

    if (entry.healthCheckRating === HealthCheckRating.LowRisk) {
      return "yellow";
    }

    if (entry.healthCheckRating === HealthCheckRating.HighRisk) {
      return "orange";
    }
    return "red";
  };

  return <div className="ui segment" key={entry.id}>
  <h2> {entry.date} <Icon name="user md" /></h2>
  <p><i>{entry.description}</i></p>
  <DiagnosisCodeDetails codes={entry.diagnosisCodes} />
  <Icon name="heart" color={healthRatingColor()} />
  </div>;
};

export default HealthCheckEntryDetail;
