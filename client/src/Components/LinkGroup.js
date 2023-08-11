import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import JoinFullIcon from '@mui/icons-material/JoinFull';
import axios from 'axios';

const LinkGroup = ( { userId } ) => {
    // State
    const theme = useTheme()
    const [snackOpen, setSnackOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({severity: 'success', message:''})
    const [search, setSearch] = useState('')
    const [waiting, setWaiting] = useState(false)
    const [buds, setBuds] = useState([])

    // Search Users
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.get(`http://localhost:5000/users/search/${search}`,
            {
                headers: {
                'Content-Type': 'application/json'
                }
            })

            setBuds(response.data)
            setAlert({severity: 'success', message: 'Found user(s)!'})
            setSnackOpen(true)
        } catch(err) {
            setBuds([])
            if (err.response) {
                setAlert({severity: 'error', message: err.response.data.error})
            } else {
                setAlert({severity: 'error', message: 'Search Failed...'})
            }
            setSnackOpen(true)
        }
    }


    // Handle Join
    const handleJoin = async (budId) => {
        try {
            const response = await axios.get(`http://localhost:5000/groups/request/${budId}/${userId}`,
            {
                headers: {
                'Content-Type': 'application/json'
                }
            })
            
            setWaiting(true)
            setSearch('')
            setBuds([])
            setAlert({severity: 'success', message: 'Request sent!'})
            setSnackOpen(true)
        } catch(err) {
            if (err.response) {
                setAlert({severity: 'error', message: err.response.data.error})
            } else {
                setAlert({severity: 'error', message: 'Join Failed...'})
            }
            setSnackOpen(true)
        }
    }


    // Handle Snackbar Close
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') return;    
        setSnackOpen(false);
    };


    // Create the found user list
    const budList = (
        <>
        <Typography variant="h5" gutterBottom>Found User(s)</Typography>
        <List sx={{bgcolor: theme.palette.primary.main, color: theme.palette.secondary.main, width: '450px', mx: 'auto'}}>
            {buds.map((bud) => {
                return (
                        <ListItem
                        key={bud._id}
                        secondaryAction={
                            <ListItemButton edge="end" aria-label="comments" onClick={() => handleJoin(bud._id)}>
                                <Stack direction='column' sx={{textAlign: 'center'}}>
                                <JoinFullIcon fontSize='large' />
                                    Join
                                </Stack>
                            </ListItemButton>
                          }
                        >
                        <ListItemAvatar>
                            <Avatar
                            alt={bud.name}
                            />
                        </ListItemAvatar>
                        <ListItemText primary={bud.name} secondary={bud.username} secondaryTypographyProps={{color: theme.palette.background.light}}/>
                        </ListItem>
                )
            })}
        </List>
        </>
    )


    // Waiting Message
    const waitMessage = (
        <Box sx={{backgroundColor: theme.palette.primary.main, p: 3, mx: 'auto', border: `1px solid ${theme.palette.secondary.main}`}}>
            <Typography variant="h5" gutterBottom>Waiting to join group!</Typography>
            <Typography variant="body1" gutterBottom>Once a group member has approve your request, you will be able to share your tastes with you bud(s)!</Typography>
        </Box>
    )

    return (
        <Box sx={{textAlign: 'center'}}>
            <Typography variant="h5" gutterBottom>Okay. It's time for you to connect with your Bud(s)! You can start by searching for a bud to join their group OR create a new group and invite your bud to join!</Typography>
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
                <Stack direction="row" spacing={2} sx={{my:4, mx: 'auto', bgColor: 'red', minWidth: '600px', display: 'flex'}}>
                    <TextField
                        type='text'
                        id="username"
                        label="Search by Name or Username"
                        variant="filled"
                        sx={{flexGrow: 1}}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        />
                    <Button type='submit' variant="contained">Find Bud</Button>
                </Stack>
                {waiting && waitMessage}
                {buds.length > 0 && budList}
                <Snackbar
                    open={snackOpen}
                    autoHideDuration={4000}
                    onClose={handleClose}
                ><Alert variant="filled" severity={alert.severity}>{alert.message}</Alert></Snackbar>
            </Box>
        </Box>
    )
}

export default LinkGroup