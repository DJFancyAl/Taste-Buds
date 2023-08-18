import { useState, useEffect } from "react"
import { UserContext } from '../../Context/UserContext' 
import { Outlet, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import BrandBar from "../BrandBar"
import axios, { AxiosError } from 'axios';

const User = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({_id: '', username: '', name: '', bio: '', pic: '', group: { _id: '', description: '', type: '', members:[], requests: []}})
  const [snackOpen, setSnackOpen] = useState(false);
  const [alert, setAlert] = useState({severity: 'success', message:''})


  // Handle Snack Close
  const handleClose = (e, reason) => {
    if (reason === 'clickaway') return;    
    setSnackOpen(false);
  };

// Get User Data with Token
useEffect(() => {
  const getUser = async () => {
    const token = localStorage.getItem('token')

    if(token) {
      try {
        const response = await axios.get(`http://localhost:5000/users/user`, { headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}})
        setUser(response.data)
      } catch(err) {
        if (err instanceof AxiosError) {
          if (err.response) {
            setAlert({severity: 'error', message: err.response.data.error})
          } else {
            setAlert({severity: 'error', message: 'Sorry - Login Failed...'})
          }
        } else {
            setAlert({severity: 'error', message: 'Sorry - Login Failed...'})
        }
          setSnackOpen(true)
      }
    } else {
      navigate('/')
    }
  }

  getUser()
  }, [navigate])


  if(user) {
    return (
      <UserContext.Provider value={{user, setUser}}>
        <BrandBar />
        <Outlet />
        <Snackbar
          open={snackOpen}
          autoHideDuration={4000}
          onClose={handleClose}
        ><Alert variant="filled" severity={alert.severity}>{alert.message}</Alert></Snackbar>
      </UserContext.Provider>
    )
  }
}

export default User