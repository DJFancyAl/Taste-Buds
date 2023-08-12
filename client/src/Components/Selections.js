import { useTheme } from '@mui/material/styles';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';


const Selections = ( { choices } ) => {
    const theme = useTheme()

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
                                    <Draggable draggableId={'selection' + String(index)} index={index}>
                                        {(provided) => (
                                            <>
                                                <ListItem key={index} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} sx={{bgcolor: theme.palette.secondary.light, p:3}}>
                                                    <ListItemText primary={choice.name} primaryTypographyProps={{color: theme.palette.primary.main, textAlign:'center', fontWeight: 'bold'}} />
                                                </ListItem>
                                                <Divider sx={{borderColor: theme.palette.primary.dark }}/>
                                            </>
                                        )}
                                    </Draggable>
                                )
                            })}
                        </List>
                    )}
                </Droppable>
            </Box>
        </Box>
    )
}

export default Selections