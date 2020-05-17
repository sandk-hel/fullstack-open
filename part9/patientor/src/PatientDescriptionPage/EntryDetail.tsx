import React from 'react';
import { Entry } from '../types';
import HospitalEntryDetail from './HospitalEntryDetail';
import HealthCheckEntryDetail from './HealthCheckEntryDetail';
import OccupationalHealthCareEntryDetail from './OccupationalHealthcareEntryDetail';

interface EntryProps {
  entry: Entry;
}

const EntryDetail: React.FC<EntryProps> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetail entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetail entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthCareEntryDetail entry={entry} />;
  }
};

export default EntryDetail;