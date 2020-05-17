import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm, { AddEntryFormValues } from './AddEntryForm';
import { ValidationErrorMessageType } from '../types';

interface Props {
  modelOpen: boolean;
  onClose: () => void;
  submit: (values: AddEntryFormValues) => void;
  validate: (values: AddEntryFormValues) => ValidationErrorMessageType;
  error?: string;
}
const AddEntryModal: React.FC<Props> = ({ modelOpen, onClose, submit, validate, error  }) => (
   <Modal open={modelOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
    {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm  onCancel={onClose} onSubmit={submit} validate={validate} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;