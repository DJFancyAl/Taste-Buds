import { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const GroupInfo = ( { group }) => {
  // State
  const theme = useTheme()
  const [data, setData] = useState({members: []})
  const {members, description, type} = data

  // Show Members
  const showMembers = (
    <List sx={{width: '100%'}}>
      {members.map((member) => {
        return (
          <ListItem key={member._id} sx={{bgcolor: theme.palette.primary.main, color: theme.palette.secondary.main, minWidth: '100%'}}>
            <Stack direction='column'>
              <ListItemText sx={{mb: 3}} primary={member.name} secondary={member.username} secondaryTypographyProps={{color: theme.palette.background.light}} />
              <Typography variant="body2" component="div">
              {member.bio}
              </Typography>
            </Stack>
          </ListItem>
        )
      })}
    </List>
  )


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
  }, [group])

  return (
    <Stack direction='row'>
      <Box sx={{width: '100%'}}>
        {members && showMembers}
      </Box>
    </Stack>
  )
}

export default GroupInfo