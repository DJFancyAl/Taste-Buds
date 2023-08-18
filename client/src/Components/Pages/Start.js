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
  }, [navigate])


  return (
    <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', m: 'auto'}}>
      <Box sx={{py:5, px: 2, width: '100%', m: 'auto'}}>
        <Link to='/'>
          <img className='bounce' src="/logo.png" alt="Taste Buds Logo" style={{width: '100%', maxWidth: '500px'}} />
        </Link>
        <Typography variant="h1" gutterBottom sx={{pt: 5, fontSize: {
        xs: '4rem',
        sm: '5.5rem',
        lg: '7rem'
      }}}>Let's Get Started!</Typography>
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