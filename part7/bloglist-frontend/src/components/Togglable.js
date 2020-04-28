import React, { useState, useImperativeHandle } from 'react'
import  { Button } from '@material-ui/core'
const Togglable =  React.forwardRef((props, ref) => {

  const [visible, setVisible] = useState(false)

  const showsWhenVisible = { 'display': visible ? '' : 'none', margin: 10 }
  const hidesWhenVisible = { 'display': visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })


  const style = { margin: 20 }

  return (
    <div style={style}>
      <Button variant="outlined" color="primary" onClick={toggleVisibility} style={hidesWhenVisible}>{props.buttonTitle}</Button>
        <div style={showsWhenVisible}>
          {props.children}
        </div>
      <Button variant="outlined" color="secondary" onClick={toggleVisibility} style={showsWhenVisible}>cancel</Button>
    </div>
  )
})

export default Togglable