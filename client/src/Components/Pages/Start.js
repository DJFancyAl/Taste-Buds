import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import LoginForm from '../LoginForm';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useEffect } from 'react';

const Start = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/user')
    }
  }, [])


  return (
    <Container sx={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', py: 5}}>
      <Box>
        <Link to='/'>
          <img src="/logo.png" alt="Taste Buds Logo" />
        </Link>
        <Typography variant="h1" gutterBottom sx={{pt: 5}}>Let's Get Started!</Typography>
        <Typography variant="subtitle1" gutterBottom sx={{mb:5}}>
            Welcome to "Taste Buds" - the ultimate solution for indecisive groups everywhere! Tired of guessing what your wife wants for dinner? Sick of your roommate ordering pizza every night? Constantly forgetting about that Sushi place down the street? WORRY NOT - We're here to help...
        </Typography>
        <Link to="/register">
          <Button variant="contained" size='large' endIcon={<HowToRegIcon />}>Create a New Account</Button>
        </Link>
        <Divider sx={{my: 5}}>OR</Divider>
        <LoginForm />
      </Box>
    </Container>
  )
}

export default Start