import { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import { Droppable } from 'react-beautiful-dnd';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import FoodItem from './FoodItem';

const OptionList = ( { filteredList, deleteItem }) => {
    const theme = useTheme()
    const [items, setItems] = useState(filteredList)

    useEffect(() => {
        setItems(filteredList)
    }, [filteredList])

    return (
        <Box sx={{bgcolor: theme.palette.primary.main, mb: 4}}>
            <Droppable droppableId='AvailableItems'>
                {(provided) => (
                    <List disablePadding ref={provided.innerRef} {...provided.droppableProps}> 
                        {filteredList.map((item, index) => {
                            return <FoodItem key={index} id={index} item={item} deleteItem={deleteItem} />
                        })}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </Box>
    )
}

export default OptionList