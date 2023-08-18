import { useState, useEffect, useContext, FormEvent } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { UserContext } from '../Context/UserContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

interface User {
    _id: String
    username: String
    name: String
    bio: String
    pic: String
}

interface UpdateProfileProps {
    updateProfile: (user: User) => {}
    loading: Boolean
    newUser: Boolean
}


const UpdateProfile = ( { updateProfile, loading, newUser}: UpdateProfileProps) => {
    // State
    const theme = useTheme()
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
    const [deleting, setDeleting] = useState(false)
    const [formData, setFormData] = useState({_id: '', username: '', name: '', bio: '', pic: ''});
    const [file] = useState(null);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
          // Convert the dropped file to base64
          const reader = new FileReader();
          reader.readAsDataURL(acceptedFiles[0]);
          reader.onload = () => {
            setFormData({...formData, pic: String(reader.result)});
          };
        },
      });
      

    // Update User Profile
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateProfile(formData)
    }

    // For Photo Upload
    const photo = acceptedFiles.map(file => (
        <Box>
          {file.name} - {file.size} bytes
        </Box>
    ));

    // Delete User
    const deleteUser = async () => {
        try {
            const token = localStorage.getItem('token')
            if(token && user) {
                if(user._id) {
                    setDeleting(true)
                    const response = await axios.delete(`http://localhost:5000/users/${user._id}`, { headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}})
                    localStorage.removeItem('token')
                    navigate('/')
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    // Sets form data to existing user
    useEffect(() => {
        setFormData(user || {_id: '', username: '', name: '', bio: '', pic: ''})
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
            
            <Box sx={{bgcolor: theme.palette.primary.main, color: theme.palette.info.main, p:1}}>
            <div {...getRootProps({className: 'dropzone'})}>
                <input type="file" accept="image/*" {...getInputProps()} />
                <Typography variant="subtitle1">Drag 'n' drop an image here, or click to select a file</Typography>
                <Typography variant="caption">{photo}</Typography>
            </div>
            </Box>

            <Box sx={{position: 'relative'}}>
                <Button type='submit' variant="contained" fullWidth>Update User</Button>
                {loading && <CircularProgress size={24} sx={{color: '#fff', position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px'}} />}
            </Box>
            <Box sx={{position: 'relative'}}>
            <Button variant="contained" fullWidth sx={{bgcolor: 'darkred', color: theme.palette.info.main, "&:hover": {backgroundColor: '#B50000'}}} onClick={deleteUser}>Delete User</Button>
                {deleting && <CircularProgress size={24} sx={{color: '#fff', position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px'}} />}
            </Box>
            <img src={String(file)} style={{display: 'none'}} />
        </Box>
    )
}

export default UpdateProfile