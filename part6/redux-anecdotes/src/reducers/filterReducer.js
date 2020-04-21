
const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.text
    default: 
      return ''
  }
}

export const setFilter = (text) => {
  return {
    type: 'FILTER',
    text
  }
}

export default filterReducer