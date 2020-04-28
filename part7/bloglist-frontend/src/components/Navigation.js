import React from 'react'
import { Link } from 'react-router-dom'
import { Toolbar, AppBar, Button, Typography } from '@material-ui/core';


const Navigation = ({ user, handleLogout }) => {
  const growStyle = { flexGrow: 1 }

  return (
    <div style={growStyle}>
      <AppBar position="static" >
        <Toolbar>
          <div style={growStyle}>
            <Button color="inherit" component={Link} to='/blogs'>Blogs</Button>
            <Button color="inherit" component={Link} to='/users'>Users</Button>
          </div>

          <Typography variant="caption" color="inherit">
            {`${user.name}`} logged in
          </Typography>

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>

        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navigation