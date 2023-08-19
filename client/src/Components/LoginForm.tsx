import { FormEvent, SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import axios, { AxiosError } from 'axios';

const LoginForm = () => {
    //State
    const navigate = useNavigate();
    const [snackOpen, setSnackOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({severity: 'success', message:''})
    const [formData, setFormData] = useState({username: '', password: ''})

    // Login Submit
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}users/login`, formData, { headers: {'Content-Type': 'application/json'}})
            if(response.data) localStorage.setItem("token", response.data)
            navigate('/user/today')
        } catch (err) {
            if (err instanceof AxiosError) {
              if (err.response) {
                setAlert({severity: 'error', message: err.response.data.error})
              } else {
                setAlert({severity: 'error', message: 'Sorry - unable to login.'})
              }
            } else {
                setAlert({severity: 'error', message: 'Sorry - unable to login.'})
            }
            setSnackOpen(true)
        }
        setLoading(false)
    }

    // Handle Snackbar Close
    const handleClose = (e: Event | SyntheticEvent, reason: string) => {
        if (reason === 'clickaway') return;    
        setSnackOpen(false);
    };

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
            <TextField id="username" label="Username" variant="filled" type='text' value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
            <TextField id="password" label="Password" variant="filled" type='password' value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <Box sx={{position: 'relative'}}>
                <Button type='submit' variant="contained" endIcon={<LoginIcon />}>Login</Button>
                {loading && <CircularProgress
                    size={24}
                    sx={{
                    color: '#fff',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                    }}
                />}
            </Box>
            <Snackbar
                open={snackOpen}
                autoHideDuration={4000}
                onClose={handleClose}
            ><Alert variant="filled" severity={alert.severity as AlertColor}>{alert.message}</Alert></Snackbar>
        </Box>
    )
}

export default LoginForm

function setSnackOpen(arg0: boolean) {
    throw new Error('Function not implemented.');
}
