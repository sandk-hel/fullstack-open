import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const style = {
    marginBottom: 10
  }
  
  const dispatch = useDispatch()

  return <div style={style}>
    filter  <input onChange={(event) => dispatch(setFilter(event.target.value))}/>
  </div>
}

export default Filter