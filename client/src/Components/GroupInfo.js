import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../Context/UserContext'
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
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import JoinFullIcon from '@mui/icons-material/JoinFull';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import axios from 'axios';

const GroupInfo = ( { group }) => {
  // State
  const theme = useTheme()
  const token = localStorage.getItem('token')
  const {user, setUser} = useContext(UserContext)
  const [promptOpen, setPromptOpen] = useState(false)
  const [snackOpen, setSnackOpen] = useState(false);
  const [alert, setAlert] = useState({severity: 'success', message:''})
  const [data, setData] = useState({members: [], requests: []})
  const {members, requests, description, type} = data

  // Handle Accept Request
  const handleAccept = async (member) => {
    try {
      const response = await axios.get(`http://localhost:5000/groups/${group}/${member}`, {headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}})
      setData(response.data)
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
      const response = await axios.put(`http://localhost:5000/groups/${group}`, {"requests": removed}, { headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}})
      setData({...data, requests: removed})
      setAlert({severity: 'success', message: 'Join Request Rejected.'})
      setSnackOpen(true)
    } catch (err) {
      setAlert({severity: 'error', message: 'Rejection failed...'})
      setSnackOpen(true)
    }
  }


  // Handle Leave Group
  const handleLeave = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/groups/${group}/${user._id}`, { headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}})
      setUser(response.data)
    } catch (err) {
      setAlert({severity: 'error', message: 'Leave Group failed...'})
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
            <ListItemText sx={{mb: 3}} primary={request.name} secondary={request.username} primaryTypographyProps={{fontWeight: 'bold', color: theme.palette.primary.main}} secondaryTypographyProps={{color: theme.palette.primary.main}} />
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


  // Mailto Command
  const sendInvite = `
  mailto:?subject=Be My Bud | Taste Buds Meal App
  &body=Join my group so we we can plan our meals together! Taste Buds is an app where we can select our desired meal options each day. It will help us make tough decisions and save us time! Visit this page to join: http://localhost:5000 %0D%0A%0D%0ASee you soon, Bud!
  `

  // Get Group Info
  useEffect(() => {
    const getGroup = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/groups/${group}`, { headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}})
        setData(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    getGroup()
  }, [group])

  return (
    <>
      <Typography variant="h5" component="div" sx={{maxWidth: '700px', mx: 'auto', my: 5, textAlign: 'center', p: 3, backgroundColor: theme.palette.secondary.dark, color: theme.palette.primary.main}}>
        {type === 'Couple' ? <FavoriteIcon sx={{mr: 2}} /> : <FastfoodIcon sx={{mr: 2}} />}
        {description}
        {type === 'Couple' ? <FavoriteIcon sx={{ml: 2}} /> : <FastfoodIcon sx={{ml: 2}} />}
      </Typography>
      <Stack direction='row' gap={2} justifyContent='center' sx={{mx: 'auto', mb: 4}}>
        <a href={sendInvite}><Button variant="contained" endIcon={<AssignmentIndIcon />}>Invite Bud</Button></a>
        <Button variant="contained" endIcon={<ExitToAppIcon />} sx={{bgcolor: 'darkred', color: theme.palette.background.light, "&:hover": {backgroundColor: '#B50000'}}} onClick={() => setPromptOpen(true)}>Leave Group</Button>
      </Stack>
      <Divider />
      <Grid container spacing={5}>
        {requests.length > 0 && 
        <Grid item xs={12} md={6}>
          <Typography variant="h5" component="div" gutterBottom>Join Requests</Typography>
          {showRequests}
        </Grid>}
        {members && 
        <Grid item xs>
          <Typography variant="h5" component="div" gutterBottom>Group Members</Typography>
          {showMembers}
        </Grid>}
      </Grid>
      <Snackbar
          open={snackOpen}
          autoHideDuration={4000}
          onClose={handleClose}
      ><Alert variant="filled" severity={alert.severity}>{alert.message}</Alert></Snackbar>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={promptOpen}
        onClick={() => setPromptOpen(false)}
      >
        <Box sx={{backgroundColor: theme.palette.primary.main, p: 5, border: `2px solid ${theme.palette.secondary.main}`, maxWidth: '600px'}}>
          Are you sure you want to leave this group? You will need to create a new request if you would like to rejoin...
          <Stack direction='row' gap={2} justifyContent='center' sx={{mx: 'auto', mt: 4}}>
            <Button variant="contained" sx={{bgcolor: 'darkred', color: theme.palette.background.light, "&:hover": {backgroundColor: '#B50000'}}} onClick={handleLeave}>Yes - Leave</Button>
            <Button variant="contained" sx={{bgcolor: theme.palette.primary.dark}}>Nevermind...</Button>
          </Stack>
        </Box>
      </Backdrop>
    </>

  )
}

export default GroupInfo