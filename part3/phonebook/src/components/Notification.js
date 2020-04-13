import React from 'react'

const Notification = ({ message })  => {
    if (null === message.text) {
        return null
    }
    const className = message.isSuccess 
                        ? "success" 
                        : "error"
    return (
        <div className={className}>
            {message.text}
        </div>
    )
}

export default Notification