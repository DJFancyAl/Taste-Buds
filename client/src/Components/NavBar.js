import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TodayIcon from '@mui/icons-material/Today';
import PeopleIcon from '@mui/icons-material/People';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

const NavBar = ( { open, toggleDrawer, logout}) => {
    const theme = useTheme()

    return (
        <Drawer
            anchor='right'
            open={open}
            onClose={toggleDrawer}
        >
            <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer} >
                <List component="nav" aria-label="NavBar Items" subheader={<ListSubheader sx={{textAlign: 'center'}}>Menu</ListSubheader>}>  
                    <Link to="/user/today" style={{ textDecoration: 'none', color: theme.palette.background.light }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon><TodayIcon /></ListItemIcon>
                                <ListItemText primary='Today' />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Divider />
                    <Link to="/user/group" style={{ textDecoration: 'none', color: theme.palette.background.light }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon><PeopleIcon /></ListItemIcon>
                                <ListItemText primary='Group' />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Divider />
                    <Link to="/user/history" style={{ textDecoration: 'none', color: theme.palette.background.light }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon><HistoryEduIcon /></ListItemIcon>
                                <ListItemText primary='History' />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Divider />
                    <Link to="/user/profile" style={{ textDecoration: 'none', color: theme.palette.background.light }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon><AccountBoxIcon /></ListItemIcon>
                                <ListItemText primary='Profile' />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton onClick={logout}>
                            <ListItemIcon><LogoutIcon /></ListItemIcon>
                            <ListItemText primary='Logout' />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </List>
            </Box>
        </Drawer>
    )
}

export default NavBar