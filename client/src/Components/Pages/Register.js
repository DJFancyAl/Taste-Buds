import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [snackOpen, setSnackOpen] = useState(false);
    const [alert, setAlert] = useState({severity: 'success', message:''})
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });
    
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') return;    
        setSnackOpen(false);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (formData.password === formData.confirmPassword) {
                const response = await axios.post('http://localhost:5000/users', formData, { headers: {'Content-Type': 'application/json'}})
                if(response.data) localStorage.setItem("token", response.data)
                navigate('/user/profile')
            } else {
                setAlert({severity: 'error', message: `Passwords don't match...`})
                setSnackOpen(true)
            }
        } catch (err) {
            if (err.response) {
                setAlert({severity: 'error', message: err.response.data.error})
            } else {
                setAlert({severity: 'error', message: 'Login Failed...'})
            }
            console.log('3')
            setSnackOpen(true)
        }
    }


    return (
        <Container sx={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', py: 5}}>
            <Box>
                <Typography variant="h2" gutterBottom>Time to Set Up an Account.</Typography>
                <Typography variant="subtitle2" gutterBottom sx={{mb:5}}>
                    First create a username and password. Then we'll find your Buds!
                </Typography>
                <Divider sx={{my: 5}} />
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
                        gap: '20px'}}
                >
                    <TextField
                        type='text'
                        fullWidth
                        id="username"
                        label="Username"
                        variant="filled"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        />
                    <TextField
                        type='password'
                        fullWidth
                        id="password"
                        label="Password"
                        variant="filled"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    <TextField
                        type='password'
                        fullWidth
                        id="password-confirm"
                        label="Confirm Password"
                        variant="filled"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        />
                    <Button type='submit' variant="contained" endIcon={<AppRegistrationIcon />}>Create Account</Button>
                </Box>
            </Box>
            <Snackbar
                open={snackOpen}
                autoHideDuration={4000}
                onClose={handleClose}
            ><Alert variant="filled" severity={alert.severity}>{alert.message}</Alert></Snackbar>
        </Container>
    )
}

export default Register