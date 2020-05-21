import React from 'react'
import Note from './components/Note'

// const Course = ({ course }) => {
//     <div>
//         <Header course={course} />
//     </div>
// }

const App = ({ notes }) => {
    return (
      <div>
        <h1>Notes</h1>
        <ul>
          {notes.map(note => 
            <Note note={note} key={note.id} />
          )}
        </ul>
      </div>
    )
}
  
  
export default App