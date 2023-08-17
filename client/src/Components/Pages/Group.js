import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext'
import { useSearchParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import GroupInfo from '../GroupInfo';
import LinkGroup from '../LinkGroup';
import CreateGroup from '../CreateGroup';

const Group = () => {
  // State
  const { user, setUser } = useContext(UserContext)
  const [searchParams] = useSearchParams();

  return (
    <Container sx={{pb: 5}}>
      <Typography variant="h2" gutterBottom sx={{mb: 5}}>Your Group</Typography>
      {user.group ? 
        <GroupInfo group={user.group} /> :
        <>
          <LinkGroup userId={user._id} newUser={searchParams.get('new')} />
          <Divider sx={{my: 5}}>OR CREATE A NEW GROUP</Divider>
          <CreateGroup userId={user._id} setUser={setUser} />
        </>
      }
    </Container>
  )
}

export default Group