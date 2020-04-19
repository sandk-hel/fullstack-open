import React, { useState, useImperativeHandle } from 'react'

const Togglable =  React.forwardRef((props, ref) => {

  const [visible, setVisible] = useState(false)

  const showsWhenVisible = { 'display': visible ? '' : 'none' }
  const hidesWhenVisible = { 'display': visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <button onClick={toggleVisibility} style={hidesWhenVisible}>{props.buttonTitle}</button>
      <div style={showsWhenVisible}>
        {props.children}
      </div>
      <button onClick={toggleVisibility} style={showsWhenVisible}>cancel</button>
    </div>
  )
})


Togglable.displayName = 'Togglable'
export default Togglable
