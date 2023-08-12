import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';

const Selections = () => {
    const theme = useTheme()

    return (
        <Box sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <Box sx={{height: '150px', textAlign:'center'}}>
                <Typography variant='h6'>Today's Choices</Typography>
                <Typography variant='subtitle2'>Select your top 3 meal choices by dragging & dropping items on the left.</Typography>
                <Typography variant='body2'>Once all members of your group have submitted their choices, you will be able to view the results on this page! Will there be a match? We'll try to make it easy by giving you helpful insights.</Typography>
            </Box>
            <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxHeight: '600px' }}>
                <List disablePadding>
                    <ListItem sx={{bgcolor: theme.palette.secondary.light}}>
                        <ListItemButton>
                            <ListItemText primary='Top Selection!' primaryTypographyProps={{color: theme.palette.primary.main, textAlign:'center', fontWeight: 'bold'}} />
                        </ListItemButton>
                    </ListItem>
                    <Divider sx={{borderColor: theme.palette.primary.dark }}/>
                    <ListItem sx={{bgcolor: theme.palette.secondary.light}}>
                        <ListItemButton>
                            <ListItemText primary='Second Choice' primaryTypographyProps={{color: theme.palette.primary.main, textAlign:'center', fontWeight: 'bold'}} />
                        </ListItemButton>
                    </ListItem>
                    <Divider sx={{borderColor: theme.palette.primary.dark }}/>
                    <ListItem sx={{bgcolor: theme.palette.secondary.light}}>
                        <ListItemButton>
                            <ListItemText primary='Third Option' primaryTypographyProps={{color: theme.palette.primary.main, textAlign:'center', fontWeight: 'bold'}} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Box>
    )
}

export default Selections