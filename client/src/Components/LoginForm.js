import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';

const LoginForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Form Submitted")
    }

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
            gap: '20px'}}
        >
            <TextField fullWidth id="username" label="Username" variant="filled" />
            <TextField fullWidth id="password" label="Password" variant="filled" />
            <Button type='submit' variant="outlined" endIcon={<LoginIcon />}>Login</Button>
        </Box>
    )
}

export default LoginForm