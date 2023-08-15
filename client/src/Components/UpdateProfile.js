import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const UpdateProfile = ( { updateProfile }) => {
    const {user} = useContext(UserContext)
    const [formData, setFormData] = useState({username: '', name: '', bio: ''});
    const [selectedFile, setSelectedFile] = useState(null)


    // const handleUpload = async () => {
    //     const formData = new FormData();
        // formData.append('profileImage', selectedFile);

        // const response = await axios.post(`http://localhost:5000/users/${user._id}/upload`, formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     }
        // })

        // setUser(response.data)
    // }

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
                {/* <Stack direction="row" spacing={2} sx={{mx: 'auto'}}>
                    <TextField
                        type='file'
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <Button variant="contained" onClick={handleUpload}>Upload Photo</Button>
                </Stack> */}
            <Button type='submit' variant="contained">Update User</Button>
        </Box>
    )
}

export default UpdateProfile