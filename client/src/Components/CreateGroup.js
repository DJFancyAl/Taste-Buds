import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import JoinFullIcon from '@mui/icons-material/JoinFull';
import axios from 'axios';

const CreateGroup = ( { userId, setUser } ) => {
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [snackOpen, setSnackOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({severity: 'success', message:''})


  // Create New Group
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')
      if(token) {
        const response = await axios.post(`http://localhost:5000/groups`,
          {"member": userId, "description": description, "type": type},
          { headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}}
        )
        console.log(response.data)
        setUser(response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // Handle Snackbar Close
  const handleClose = (e, reason) => {
    if (reason === 'clickaway') return;    
    setSnackOpen(false);
  };

  return (
    <Box sx={{textAlign: 'center'}}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{
            m: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            textAlign: 'center'
        }}
      >
        <Stack direction="column" spacing={2} sx={{my:4, mx: 'auto', minWidth: '600px', display: 'flex'}}>
          <FormControl fullWidth>
            <InputLabel id="group-type-label">Group Type</InputLabel>
            <Select
              labelId="group-type"
              id="group-type"
              value={type}
              label="Group Type"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value='Couple'>Couple</MenuItem>
              <MenuItem value='Group'>Group</MenuItem>
            </Select>
          </FormControl>
          <TextField
              type='text'
              id="description"
              label="Group Description - Tell your Buds why we're here."
              variant="filled"
              multiline
              rows={3}
              sx={{flexGrow: 1}}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              />
            <Button type='submit' variant="contained"><JoinFullIcon />Create Group</Button>
        </Stack>
        <Snackbar
            open={snackOpen}
            autoHideDuration={4000}
            onClose={handleClose}
        ><Alert variant="filled" severity={alert.severity}>{alert.message}</Alert></Snackbar>
      </Box>
    </Box>
  )
}

export default CreateGroup