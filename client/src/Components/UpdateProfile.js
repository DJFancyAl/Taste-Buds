import { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { UserContext } from '../Context/UserContext';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FileBase64 from 'react-file-base64';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';


const UpdateProfile = ( { updateProfile, loading, newUser}) => {
    // State
    const theme = useTheme()
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
    const [deleting, setDeleting] = useState(false)
    const [formData, setFormData] = useState({username: '', name: '', bio: '', image: null});
    const [file] = useState(null);

    // Update User Profile
    const handleSubmit = async (e) => {
        e.preventDefault()
        updateProfile(formData)
    }

    // Delete User
    const deleteUser = async () => {
        try {
            const token = localStorage.getItem('token')
            if(token) {
                setDeleting(true)
                const response = await axios.delete(`http://localhost:5000/users/${user._id}`, { headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}})
                localStorage.removeItem('token')
                navigate('/')
            }
        } catch (e) {
            console.log(e)
        }
    }


    // Sets form data to existing user
    useEffect(() => {
        setFormData(user)
    }, [user])

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: '600px',
                m: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                textAlign: 'center'
            }}
        >
            <Typography variant="h4" gutterBottom>Update Profile</Typography>
            {newUser && (
                <Typography variant="subtitle2" sx={{backgroundColor: theme.palette.secondary.dark, color: theme.palette.primary.main, p: 2}}>WELCOME! First let's update your profile! Once you're done - you'll need to join a group. <Link to="/user/group?new=true" style={{
                    fontWeight: 'bold',
                    color: theme.palette.primary.dark
                  }}>Click here to procede to the group page.</Link></Typography>
            )}
            <TextField
                type='text'
                fullWidth
                id="username"
                label="Edit Username"
                variant="filled"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
            <TextField
                type='text'
                fullWidth
                id="name"
                label="Edit Name"
                variant="filled"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
            <TextField
                type='text'
                fullWidth
                id="bio"
                label="Your Bio"
                placeholder='Tell us a little about yourself...'
                variant="filled"
                value={formData.bio}
                multiline
                rows={3}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                />
            <Stack direction='row' gap={4} sx={{backgroundColor: theme.palette.primary.main, alignItems: 'center', p: 2}}>
                <Typography variant="body2">Image:</Typography>
                <FileBase64
                    multiple={ false }
                    onDone={({base64}) => setFormData({...formData, pic: base64})}
                    style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }} />
            </Stack>
            <Box sx={{position: 'relative'}}>
                <Button type='submit' variant="contained" fullWidth>Update User</Button>
                {loading && <CircularProgress size={24} sx={{color: '#fff', position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px'}} />}
            </Box>
            <Box sx={{position: 'relative'}}>
            <Button variant="contained" fullWidth sx={{bgcolor: 'darkred', color: theme.palette.background.light, "&:hover": {backgroundColor: '#B50000'}}} onClick={deleteUser}>Delete User</Button>
                {deleting && <CircularProgress size={24} sx={{color: '#fff', position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px'}} />}
            </Box>
            <img src={file} />
        </Box>
    )
}

export default UpdateProfile