import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Backdrop from '@mui/material/Backdrop';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import QuizIcon from '@mui/icons-material/Quiz';
import axios from 'axios';


const Selections = ( { choices, today, setToday, userId } ) => {
    const theme = useTheme()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const submitted = today.selections.some((selection) => selection.member === userId)

            if(!submitted) {
                setLoading(true)
                const response = await axios.post(`http://localhost:5000/days/${today._id}`,
                {"member": userId, "selection": choices },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                )
                setToday(response.data)
                setLoading(false)
            } else {
                console.log('Already submitted')
            }
          } catch (err) {
            console.log(err)
          }
    }

    return (
        <Box sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <Box sx={{height: '150px', textAlign:'center'}}>
                <Typography variant='h6'>Today's Choices</Typography>
                <Typography variant='subtitle2'>Select your top 3 meal choices by dragging & dropping items on the left.</Typography>
                <Typography variant='body2'>Once all members of your group have submitted their choices, you will be able to view the results on this page! Will there be a match? We'll try to make it easy by giving you helpful insights.</Typography>
            </Box>
            <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxHeight: '600px' }}>
                <Droppable droppableId='SelectedItems'>
                    {(provided) => (
                        <List disablePadding ref={provided.innerRef} {...provided.droppableProps}>
                            {choices.map((choice, index) => {
                                return (
                                    <Draggable draggableId={'selection' + String(index)} key={index} index={index}>
                                        {(provided) => (
                                            <>
                                                <ListItem {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} sx={choice.type === 'Placeholder' ? {opacity: '0.4', backgroundColor: theme.palette.secondary.light, p:3} : {backgroundColor: theme.palette.secondary.light, p:3}}>
                                                    <ListItemIcon sx={{color: theme.palette.primary.main}}>
                                                        {choice.type === 'Placeholder' && <QuizIcon />}
                                                        {choice.type === 'Takeout' && <FastfoodIcon />}
                                                        {choice.type === 'Eat In' && <DinnerDiningIcon />}
                                                        {choice.type === 'Dine Out' && <LocalDiningIcon />}
                                                    </ListItemIcon>
                                                    <ListItemText primary={choice.name} primaryTypographyProps={{color: theme.palette.primary.main, fontWeight: 'bold'}} />
                                                </ListItem>
                                                <Divider sx={{borderColor: theme.palette.primary.dark }}/>
                                            </>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </List>
                    )}
                </Droppable>
                <Button variant='contained' sx={{mt:3}} onClick={handleSubmit}>Submit Choices</Button>
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <Box sx={{textAlign: 'center'}} >
                    <CircularProgress sx={{color: theme.palette.secondary.main, mb: 3}} />
                    <Typography variant='h6'>Fetching results...</Typography>
                </Box>
            </Backdrop>
        </Box>
    )
}

export default Selections