import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import HealthCheckEntryForm, { HealthCheckFormValues } from './HealthCheckEntryForm';

interface Props {
  modelOpen: boolean;
  onClose: () => void;
  submit: (values: HealthCheckFormValues) => void;
  error?: string;
}
const AddEntryModal: React.FC<Props> = ({ modelOpen, onClose, submit, error  }) => (
   <Modal open={modelOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
    {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <HealthCheckEntryForm  onCancel={onClose} onSubmit={submit} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;