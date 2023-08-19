import { useContext } from 'react'
import { Divider, Stack, useTheme } from '@mui/material';
import { UserContext } from '../Context/UserContext';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import axios from 'axios';


interface Member {
    _id: string
    username: string
    name: string
    bio: string
    pic: string
}

interface Selection {
    member: Member
    selection: {name: String, type: String}[]
}

interface Today {
    _id: String
    selections: Selection[]
    group: {members: Member[]}
    summary: {
        top_choice: String
        second_choice: String
        explanation: String
    }
}

interface ResultsProps {
    today: Today
    setToday: (day: Today) => {}
}


const Results = ( { today, setToday }: ResultsProps) => {
    const { user } = useContext(UserContext)
    const theme = useTheme()
    const userSelection = today.selections.find(selection => selection.member._id === user._id)

    // Percent of Progress (for progress bar)
    const progress = (today.selections.length/today.group.members.length) * 100

    // Handle Delete Selections
    const deleteSelections = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}days/${today._id}/${user._id}`,{headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}})
            setToday(response.data)
          } catch (err) {
            console.log(err)
          }
    }

    // Today's Results
    const summary = () => {
        return (
            <>
                <Box sx={{maxWidth:'1000px', textAlign: 'center', m: 'auto', p: 3, backgroundColor: theme.palette.primary.main}}>
                    <Typography variant="subtitle1" gutterBottom>Today's results are in...</Typography>
                    <Typography className='bounce' variant="h5" sx={{fontWeight: 'bold'}} gutterBottom><EmojiEventsIcon /> Top Choice: {today.summary.top_choice} <EmojiEventsIcon /></Typography>
                    <Typography variant="h6">Alternative Choice: {today.summary.second_choice}</Typography>
                    <Divider sx={{my: 3}} />
                    <Typography variant="body2" gutterBottom>{today.summary.explanation}</Typography>
                </Box>
                <Divider sx={{my: 4}}>CHOICES</Divider>
                <Grid container spacing={4}>
                    {today.selections.map((selection, index) => {
                        return (
                        <Grid key={index} item xs={12} md={6}>
                            <List
                                sx={{bgcolor: theme.palette.primary.main}}
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader"><Stack direction='row' gap={1} sx={{alignItems: 'center', py: 1}}><Avatar src={String(selection.member.pic)} variant='square' />{selection.member.name}'s Choices:</Stack></ListSubheader>
                                }>
                                {selection.selection.map((item, j) => {
                                    return (
                                        <ListItem key={j}>
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
                        </Grid>
                        )
                    })}
                </Grid>
                <Divider sx={{my: 4}} />
                <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>Come back tomorrow to choose another meal!</Typography>
            </>
    )}


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
                {userSelection?.selection.map((item: {type: String, name: String}, index) => {
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
            <Button variant='contained' sx={{bgcolor: 'darkred', color: theme.palette.info.main, "&:hover": {backgroundColor: '#B50000'}}} onClick={deleteSelections}><RestartAltIcon />Reset Choices</Button>
        </Box>
    )

  return (
    <>
        {today.summary ? summary() : waiting}
    </>
  )
}

export default Results