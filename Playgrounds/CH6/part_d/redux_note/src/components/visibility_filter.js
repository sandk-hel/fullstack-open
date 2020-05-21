import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = () => {
  const dispatch = useDispatch()
  const selectedFilter = useSelector(state => state.filter)

  const filterSelected = (filter) => {
    dispatch(filterChange(filter))
  }

  return (
    <div>
      all
      <input
        type='radio'
        name='filter'
        onChange={() => dispatch(filterChange('ALL'))}
      />
      
      important
      <input
        type='radio'
        name='filter'
        onChange={() => dispatch(filterChange('IMPORTANT'))}
      />
      
      nonimportant
      <input
        type='radio'
        name='filter'
        onChange={() => dispatch(filterChange('NONIMPORTANT'))}
      />
    </div>
  )
}

export default VisibilityFilter