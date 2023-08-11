import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import GroupInfo from '../GroupInfo';
import LinkGroup from '../LinkGroup';

const Group = () => {
  const { user } = useContext(UserContext)

  return (
    <Container>
      <Typography variant="h2" gutterBottom>Your Group</Typography>
      <Divider sx={{ my: 4 }} />
      {user.group ? 
        <GroupInfo group={user.group} /> :
        <LinkGroup userId={user._id} />
      }
    </Container>
  )
}

export default Group