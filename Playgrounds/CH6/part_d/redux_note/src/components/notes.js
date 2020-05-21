import React from 'react'
import { connect } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Notes = (props) => {
  return <ul>
    {props.notes.map(item =>
      <li
        key={item.id}
        onClick={() => props.toggleImportanceOf(item.id)}
      >
        {item.content} <strong>{item.important ? 'Important' : ''}</strong>
      </li>
    )}
  </ul>
}

const mapStateToProps = (state) => {
  if (state.filter === 'ALL') {
    return {
      notes: state.notes
    }
  }

  return {
    notes: (state.filter === 'IMPORTANT' 
      ? state.notes.filter(note => note.important)
      : state.notes.filter(note => !note.important))
  }
}

const mapDispatchToProps = {
  toggleImportanceOf,
}

const ConnectedNotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes)

export default ConnectedNotes