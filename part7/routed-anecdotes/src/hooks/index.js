import { useState } from 'react'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = ({ target }) => {
    setValue(target.value)
  }

  const reset = () => {
    setValue('')
  }

  return { value, type, onChange, reset }
}

export { useField }
