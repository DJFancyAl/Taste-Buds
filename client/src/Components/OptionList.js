import { useTheme } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import FoodItem from './FoodItem';

const OptionList = ({items}) => {
    const theme = useTheme()

    return (
        <Box sx={{bgcolor: theme.palette.primary.main, mb: 4}}>
            <Droppable droppableId='AvailableItems'>
                {(provided) => (
                    <List disablePadding ref={provided.innerRef} {...provided.droppableProps}> 
                        {items.map((item, index) => {
                            return <FoodItem id={index} item={item} />
                        })}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </Box>
    )
}

export default OptionList