import React from 'react';
import { Entry } from '../types';
import EntryDetail from './EntryDetail';

const EntriesDetail: React.FC<{ entries: Entry[] }> = ({ entries }) => {
  if (!entries) {
    return null;
  }
  return <div>
      {entries.map(entry =>  <EntryDetail key={entry.id} entry={entry} />)}
    </div>;
};

export default EntriesDetail;
