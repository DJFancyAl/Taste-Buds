import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import GroupInfo from '../GroupInfo';
import LinkGroup from '../LinkGroup';

const Group = () => {
  const { user, setUser } = useContext(UserContext)

  return (
    <Container sx={{pb: 5}}>
      <Typography variant="h2" gutterBottom>Your Group</Typography>
      <Divider sx={{ my: 4 }} />
      {user.group ? 
        <GroupInfo group={user.group} user={user} setUser={setUser} /> :
        <LinkGroup userId={user._id} />
      }
    </Container>
  )
}

export default Group