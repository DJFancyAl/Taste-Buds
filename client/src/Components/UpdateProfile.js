import { useState, useEffect, useContext } from 'react';
import { useTheme } from '@mui/material';
import { UserContext } from '../Context/UserContext';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FileBase64 from 'react-file-base64';
import CircularProgress from '@mui/material/CircularProgress';


const UpdateProfile = ( { updateProfile, loading }) => {
    // State
    const theme = useTheme()
    const {user} = useContext(UserContext)
    const [formData, setFormData] = useState({username: '', name: '', bio: '', image: null});
    const [file, setFile] = useState(null);

    // Update User Profile
    const handleSubmit = async (e) => {
        e.preventDefault()
        updateProfile(formData)
    }


    // Sets form data to existing user
    useEffect(() => {
        setFormData(user)
    }, [])

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
            <img src={file} />
        </Box>
    )
}

export default UpdateProfile