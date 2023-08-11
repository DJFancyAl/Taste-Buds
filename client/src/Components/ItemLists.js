import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { ListSubheader } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const ItemLists = () => {
    const theme = useTheme()
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{bgcolor: theme.palette.primary.main}}>
            <List>
                <ListSubheader>Takeout</ListSubheader>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    >
                    <ExpandMoreIcon />
                </ExpandMore>
                <Collapse in={expanded} timeout="auto" unmountOnExit>

                </Collapse>
            </List>
        </Box>
    )
}

export default ItemLists