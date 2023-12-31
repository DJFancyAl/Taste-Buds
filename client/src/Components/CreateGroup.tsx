import { FormEvent, SyntheticEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import JoinFullIcon from '@mui/icons-material/JoinFull';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

interface Member {
  _id: string
  username: string
  name: string
  bio: string
  pic: string
}

interface User {
  _id: string
  username: string
  name: string
  bio: string
  pic: string
  group: {
      _id: string
      description: string
      type: string
      requests: Number[]
      members: Member[]
  }
}

interface CreateGroupProps {
  userId: string
  setUser: (user: User) => void
}

const CreateGroup = ( { userId, setUser }: CreateGroupProps ) => {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [snackOpen, setSnackOpen] = useState(false);
  const [alert] = useState({severity: 'success', message:''})


  // Create New Group
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')
      if(token) {
        setLoading(true)
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}groups`,
          {"member": userId, "description": description, "type": type},
          { headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}}
        )
        setUser(response.data)
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  // Handle Snackbar Close
  const handleClose = (e: Event | SyntheticEvent, reason: string) => {
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
        <Stack direction="column" spacing={2} sx={{my:4, mx: 'auto', width: '100%', maxWidth: '600px', display: 'flex'}}>
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
            <Box sx={{position: 'relative'}}>
              <Button type='submit' variant="contained" fullWidth><JoinFullIcon />Create Group</Button>
              {loading && <CircularProgress size={24} sx={{color: '#fff', position: 'absolute', top: '50%', left: '50%', marginTop: '-12px', marginLeft: '-12px'}} />}
            </Box>
        </Stack>
        <Snackbar
            open={snackOpen}
            autoHideDuration={4000}
            onClose={handleClose}
        ><Alert variant="filled" severity={alert.severity as AlertColor}>{alert.message}</Alert></Snackbar>
      </Box>
    </Box>
  )
}

export default CreateGroup