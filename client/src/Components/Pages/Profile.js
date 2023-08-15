import React, { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import { format } from 'date-fns'
import UpdateProfile from '../UpdateProfile';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

const Profile = () => {
    const {user, setUser} = useContext(UserContext)
    const {username, date, name} = user
    const inputDate = new Date(date);
    
    return (
        <Container sx={{pb: 4}}>
            <Stack direction='row' spacing={2} sx={{alignItems: 'center', pb: 2}} divider={<Divider orientation="vertical" flexItem />}>
                <Avatar
                    alt={user.username}
                    src="/static/images/avatar/1.jpg"
                    variant='rounded'
                    sx={{ width: 80, height: 80 }}
                />
                <Box>
                    <Typography variant="h3">{name}</Typography>
                    <Typography variant="subtitle1" gutterBottom>{username} joined on {format(inputDate, 'M/d/yyyy')}</Typography>
                </Box>
            </Stack>
            <Divider sx={{my:4}} />
            <UpdateProfile user={user} setUser={setUser} />
        </Container>
    )
}

export default Profile