import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext'
import { useSearchParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
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
      <Box sx={{width: '100%', m: 'auto'}}>
        <Typography variant="h2" gutterBottom sx={{mb: 5, textAlign: { xs: 'center', md: 'inherit' }}}>Your Group</Typography>
        {user.group ? 
          <GroupInfo group={user.group} /> :
          <>
            <LinkGroup userId={user._id} newUser={searchParams.get('new')} />
            <Divider sx={{my: 5}}>OR CREATE A NEW GROUP</Divider>
            <CreateGroup userId={user._id} setUser={setUser} />
          </>
        }
      </Box>
    </Container>
  )
}

export default Group