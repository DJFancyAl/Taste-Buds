import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import LoginForm from '../LoginForm';


const Start = () => {
  return (
    <Container sx={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', py: 5}}>
        <Box>
            <Typography variant="h1" gutterBottom>Let's Get Started!</Typography>
            <Typography variant="subtitle1" gutterBottom sx={{mb:5}}>
                Welcome to "Taste Buds" - the ultimate solution for indecisive groups everywhere! Tired of guessing what your wife wants for dinner? Sick of your roommate ordering pizza every night? Constantly forgetting about that Sushi place down the street? WORRY NOT - We're here to help...
            </Typography>
            <Button variant="outlined" size='large'>Create a New Account</Button>
            <Divider sx={{my: 5}}>OR</Divider>
            <LoginForm />
        </Box>
    </Container>
  )
}

export default Start