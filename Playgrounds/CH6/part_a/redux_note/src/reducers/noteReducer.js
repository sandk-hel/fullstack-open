const generateId = () => Number((Math.random() * 10000000).toFixed(0))

let noteState = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]
    case 'TOGGLE_IMPORTANCE':
      const id = action.data.id 
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }

      return state.map(note => 
        note.id !== id ? note : changedNote 
      )

    default: 
    return state
  }
}

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}


export default noteState