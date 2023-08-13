import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import GroupInfo from '../GroupInfo';
import LinkGroup from '../LinkGroup';
import CreateGroup from '../CreateGroup';

const Group = () => {
  const { user, setUser } = useContext(UserContext)

  return (
    <Container sx={{pb: 5}}>
      <Typography variant="h2" gutterBottom sx={{mb: 5}}>Your Group</Typography>
      {user.group ? 
        <GroupInfo group={user.group} /> :
        <>
          <LinkGroup userId={user._id} />
          <Divider sx={{my: 5}}>OR CREATE A NEW GROUP</Divider>
          <CreateGroup />
        </>
      }
    </Container>
  )
}

export default Group