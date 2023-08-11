import { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import JoinFullIcon from '@mui/icons-material/JoinFull';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import axios from 'axios';

const GroupInfo = ( { group }) => {
  // State
  const theme = useTheme()
  const [snackOpen, setSnackOpen] = useState(false);
  const [alert, setAlert] = useState({severity: 'success', message:''})
  const [data, setData] = useState({members: [], requests: []})
  const {members, requests} = data

  // Handle Accept Request
  const handleAccept = async (member) => {
    try {
      const response = await axios.put(`http://localhost:5000/groups/${group}/${member}`, {headers: {'Content-Type': 'application/json'}})
      // setData(response.data)
      setAlert({severity: 'success', message: 'Join Request Accepted!'})
      setSnackOpen(true)
    } catch (err) {
      setAlert({severity: 'error', message: 'Request Acceptance failed...'})
      setSnackOpen(true)
    }
  }

  // Handle Reject Request
  const handleReject = async (member) => {
    try {
      const removed = requests.filter((request) => request._id !== member)
      const response = await axios.put(`http://localhost:5000/groups/${group}`, {"requests": removed}, { headers: {'Content-Type': 'application/json'}})
      setData({...data, requests: removed})
      setAlert({severity: 'success', message: 'Join Request Rejected.'})
      setSnackOpen(true)
    } catch (err) {
      setAlert({severity: 'error', message: 'Rejection failed...'})
      setSnackOpen(true)
    }
  }


  // Show Members
  const showMembers = (
    <Stack direction='column' gap={4}>
      {members.map((member) => {
        return (
          <Card key={member._id}>
            <CardContent>
            <Typography variant="h6">{member.name}</Typography>
            <Typography variant="subtitle2" gutterBottom>{member.username}</Typography>
            <Divider />
            <Typography variant="body2" sx={{mt:4}}>{member.bio}</Typography>
            </CardContent>
          </Card>
        )
      })}
    </Stack>
  )

  // Show Requests
  const showRequests = (
    <List sx={{width: '100%', p: 0}}>
      {requests.map((request) => {
        return (
          <ListItem
            key={request._id}
            sx={{bgcolor: theme.palette.secondary.dark, color: theme.palette.primary.main, minWidth: '100%', borderTop: `1px solid ${theme.palette.primary.main}`}}
            secondaryAction={
              <Box edge="end">
                <IconButton
                  aria-label="approve join"
                  sx={{backgroundColor: theme.palette.primary.main, color: theme.palette.secondary.main, "&:hover": {backgroundColor: theme.palette.primary.light}}}
                  onClick={() => handleAccept(request._id)}
                  >
                  <JoinFullIcon />
                </IconButton>
                <IconButton
                  aria-label="reject request"
                  sx={{backgroundColor: 'darkred', color: theme.palette.background.light, marginLeft:2, "&:hover": {backgroundColor: '#B50000'}}}
                  onClick={() => handleReject(request._id)}
                  >
                  <ThumbDownIcon />
                </IconButton>
              </Box>
            }
            >
            <ListItemText sx={{mb: 3}} primary={request.name} secondary={request.username} primaryTypographyProps={{fontWeight: 'bold'}} secondaryTypographyProps={{color: theme.palette.primary.main}} />
          </ListItem>
        )
      })}
    </List>
  )

  // Handle Snackbar Close
  const handleClose = (e, reason) => {
    if (reason === 'clickaway') return;    
      setSnackOpen(false);
  };
  
  // Get Group Info
  useEffect(() => {
    const getGroup = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/groups/${group}`)
        setData(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    getGroup()
  }, [group, data])

  return (
    <Grid container spacing={5}>
      {requests.length > 0 && 
      <Grid item xs={12} md={6}>
        <Typography variant="h5" component="div" gutterBottom>Join Requests</Typography>
        {showRequests}
      </Grid>}
      {members && 
      <Grid item xs={12} md={6}>
        <Typography variant="h5" component="div" gutterBottom>Group Members</Typography>
        {showMembers}
      </Grid>}
      <Snackbar
                open={snackOpen}
                autoHideDuration={4000}
                onClose={handleClose}
            ><Alert variant="filled" severity={alert.severity}>{alert.message}</Alert></Snackbar>
    </Grid>

  )
}

export default GroupInfo