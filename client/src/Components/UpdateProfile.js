import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';

const UpdateProfile = ({ user, setUser }) => {
    const {_id, pic} = user
    const [snackOpen, setSnackOpen] = useState(false);
    const [alert, setAlert] = useState({severity: '', message:''})
    const [formData, setFormData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null)

    const handleFileChange = (e) => { setSelectedFile(e.target.files[0]) };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('profileImage', selectedFile);

        const response = await axios.post(`http://localhost:5000/users/${_id}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })

        setUser(response.data)
    }

    // Update User Profile
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:5000/users/${_id}`,
                formData,
                {
                    headers: {
                    'Content-Type': 'application/json'
                    }
                }
            )
            setUser(response.data)
            setAlert({severity: 'success', message: 'Profile Updated!'})
            setSnackOpen(true)
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
                <Stack direction="row" spacing={2} sx={{mx: 'auto'}}>
                    <TextField
                        type='file'
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <Button variant="contained" onClick={handleUpload}>Upload Photo</Button>
                </Stack>
            <Button type='submit' variant="contained">Update User</Button>
            <Snackbar
                open={snackOpen}
                autoHideDuration={4000}
                onClose={handleClose}
            ><Alert variant="filled" severity={alert.severity}>{alert.message}</Alert></Snackbar>
        </Box>
    )
}

export default UpdateProfile