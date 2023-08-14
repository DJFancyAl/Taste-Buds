import { useState, useEffect, useContext } from 'react'
import { useTheme } from '@mui/material';
import { UserContext } from '../Context/UserContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress from '@mui/material/LinearProgress';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import axios from 'axios';

const Results = ( { today, setToday }) => {
    const { user } = useContext(UserContext)
    const theme = useTheme()
    const userSelection = today.selections.find(selection => selection.member === user._id)


    // Percent of Progress (for progress bar)
    const progress = (today.selections.length/today.group.members.length) * 100


    // Handle Delete Selections
    const deleteSelections = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/days/${today._id}/${user._id}`,{headers: {'Content-Type': 'application/json'}})
            setToday(response.data)
          } catch (err) {
            console.log(err)
          }
    }


    // Today's Results
    const summary = (
        <>
            <Typography variant="h4" gutterBottom>{today.summary}</Typography>
            <Typography variant="h4" gutterBottom>{today.summary}</Typography>
        </>
    )


    // If waiting for group's results
    const waiting = (
        <Box sx={{textAlign: 'center'}}>
            <Typography variant="h5" gutterBottom>Still waiting for other choices...</Typography>
            <Typography variant="body2" gutterBottom>Once everyone has submitted their choices we'll share the results here! Please check back later.</Typography>
            <Box sx={{maxWidth: '800px', mx: 'auto', my: 3}}>
                <LinearProgress variant='determinate' value={progress} />
                <Typography variant="subtitle2">{progress}% Submitted</Typography>
            </Box>
            

            <List
                sx={{maxWidth: '600px', m: 'auto', bgcolor: theme.palette.primary.main, mt: 4, mb: 2}}
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">Your Selections for Today</ListSubheader>
                }>
                {userSelection.selection.map((item, index) => {
                    return (
                        <ListItem key={index}>
                                <ListItemIcon>
                                    {item.type === 'Takeout' && <FastfoodIcon />}
                                    {item.type === 'Eat In' && <DinnerDiningIcon />}
                                    {item.type === 'Dine Out' && <LocalDiningIcon />}
                                </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    )
                })}
            </List>
            <Button variant='contained' sx={{bgcolor: 'darkred', color: theme.palette.background.light, "&:hover": {backgroundColor: '#B50000'}}} onClick={deleteSelections}><RestartAltIcon />Reset Choices</Button>
        </Box>
    )

  return (
    <>
        {today.summary ? summary : waiting}
    </>
  )
}

export default Results