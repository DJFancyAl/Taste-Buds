import { useState, useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import { useSearchParams } from 'react-router-dom';
import { format } from 'date-fns'
import UpdateProfile from '../UpdateProfile';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';


const Profile = () => {
    const {user, setUser} = useContext(UserContext)
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const [alert, setAlert] = useState({severity: 'success', message:''})
    const inputDate = new Date(user.date);

    // Update Profile
    const updateProfile = async (formData) => {
        try {
            const token = localStorage.getItem('token')
            if(token) {
                setLoading(true)
                const response = await axios.put(`http://localhost:5000/users/${user._id}`, formData, { headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}})
                setUser(response.data)
                setLoading(false)
                setAlert({severity: 'success', message: 'Profile Updated!'})
                setSnackOpen(true)
            }
        } catch (e) {
            setAlert({severity: 'error', message: 'Update failed...'})
            setSnackOpen(true)
        }
    }


    // Handle Snackbar Close
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') return;    
        setSnackOpen(false);
    };
    
    return (
        <Container sx={{pb: 4}}>
            <Stack direction='row' spacing={2} sx={{alignItems: 'center', pb: 2}} divider={<Divider orientation="vertical" flexItem />}>
                <Avatar
                    alt={user.username}
                    src={user.pic}
                    variant='rounded'
                    sx={{ width: 80, height: 80 }}
                />
                <Box>
                    <Typography variant="h3">{user.name}</Typography>
                    <Typography variant="subtitle1" gutterBottom>{user.username} joined on {format(inputDate, 'M/d/yyyy')}</Typography>
                </Box>
            </Stack>
            <Divider sx={{my:4}} />
            <UpdateProfile updateProfile={updateProfile} loading={loading} newUser={searchParams.get('new')} setAlert={setAlert} setSnackOpen={setSnackOpen} />
            <Snackbar
                open={snackOpen}
                autoHideDuration={4000}
                onClose={handleClose}
            ><Alert variant="filled" severity={alert.severity}>{alert.message}</Alert></Snackbar>
        </Container>
    )
}

export default Profile