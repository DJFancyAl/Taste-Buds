import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';

const FoodItem = ( { item }) => {
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton >
            <ListItemIcon>
                {item.type === 'Takeout' && <FastfoodIcon />}
                {item.type === 'Eat In' && <DinnerDiningIcon />}
                {item.type === 'Dine Out' && <LocalDiningIcon />}
            </ListItemIcon>
            <ListItemText primary={item.name} />
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  )
}

export default FoodItem