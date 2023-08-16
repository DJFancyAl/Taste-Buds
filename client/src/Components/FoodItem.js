import { useTheme } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DeleteIcon from '@mui/icons-material/Delete';

const FoodItem = ( { id, item, deleteItem }) => {
  const theme = useTheme()

  return (
    <Draggable draggableId={String(id)} index={id}>
      {(provided) => (
        <>
          <ListItem {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" sx={{color: theme.palette.primary.dark}} onClick={() => deleteItem(item)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
                {item.type === 'Takeout' && <FastfoodIcon />}
                {item.type === 'Eat In' && <DinnerDiningIcon />}
                {item.type === 'Dine Out' && <LocalDiningIcon />}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
          <Divider />
        </>
      )}
    </Draggable>
  )
}

export default FoodItem