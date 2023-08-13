import { useTheme } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import FoodItem from './FoodItem';

const OptionList = ({items, setItems}) => {
    const theme = useTheme()

    const deleteItem = (id) => {
        const newItems = items
        newItems.splice(id, 1)
        // console.log(newItems)
        setItems(newItems)
    }

    return (
        <Box sx={{bgcolor: theme.palette.primary.main, mb: 4}}>
            <Droppable droppableId='AvailableItems'>
                {(provided) => (
                    <List disablePadding ref={provided.innerRef} {...provided.droppableProps}> 
                        {items.map((item, index) => {
                            return <FoodItem id={index} item={item} deleteItem={deleteItem} />
                        })}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </Box>
    )
}

export default OptionList