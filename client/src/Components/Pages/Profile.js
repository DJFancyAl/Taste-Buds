import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../Context/UserContext' 
import { format } from 'date-fns'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';

const Profile = () => {
    const {user, setUser} = useContext(UserContext)
    const {_id, username, date, name, pic} = user
    const inputDate = new Date(date);
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

    const handleSubmit = (e) => {
        e.preventDefault()
    }


    useEffect(() => {
        setFormData(user)
    }, [])

    return (
        <Container>
            <Avatar
                alt={user.username}
                src="/static/images/avatar/1.jpg"
                variant='rounded'
                sx={{ width: 54, height: 54 }}
            />
            <Typography variant="h2">{name}</Typography>
            <Typography variant="subtitle1" gutterBottom>{username} joined on {format(inputDate, 'M/d/yyyy')}</Typography>
            <Divider sx={{my:4}} />
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
                        helperText="Name you'll use for login."
                        />
                    <TextField
                        type='text'
                        fullWidth
                        id="name"
                        label="Edit Name"
                        variant="filled"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        helperText="How your group will see you."
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
                        helperText="Tell us a little about yourself."
                        />
                        <Stack direction="row" spacing={2} sx={{mx: 'auto'}}>
                            <TextField
                                type='file'
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <Button variant="contained" onClick={handleUpload}>Upload Photo</Button>
                        </Stack>
                    <Button type='submit' variant="outlined">Update User</Button>
                </Box>
        </Container>
    )
}

export default Profile