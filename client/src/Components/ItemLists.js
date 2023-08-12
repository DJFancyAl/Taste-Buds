import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import axios from 'axios';


const ItemLists = ( { group }) => {
    // State
    const theme = useTheme()
    const [items, setItems] = useState([])
    const [itemName, setItemName] = useState('')
    const [itemType, setItemType] = useState('')
    const [filteredTypes, setFilteredTypes] = useState([])

    // Filtered List
    const filteredItems = () => {
        const filteredList = items.filter((item) => {
            return !filteredTypes.includes(item.type)
        })
        return filteredList
    }
    

    // Toggle Filters
    const toggleFilters = (e) => {
        const type = e.target.value
        if (filteredTypes.includes(type)) {
            setFilteredTypes(filteredTypes.filter((x) => x !== type))
        } else {
            setFilteredTypes([...filteredTypes, type])
        }
    }


    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response  = await axios.post(`http://localhost:5000/groups/${group._id}/items`,
            {'name': itemName, 'type': itemType},
            {headers: {'Content-Type': 'application/json'}})
            
            setItems([...items, response.data])
            setItemName('')
            setItemType('')
        } catch(err) {
            console.log(err)
          }
    }
    
    
    // Item List
    const itemList = (
        <Box sx={{bgcolor: theme.palette.primary.main, mb: 4}}>
                <List disablePadding>
                    {filteredItems().map((item, index) => {
                        return (
                            <>
                                <List key={index} component="div" >
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            {item.type === 'Takeout' && <FastfoodIcon />}
                                            {item.type === 'Eat In' && <DinnerDiningIcon />}
                                            {item.type === 'Dine Out' && <LocalDiningIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItemButton>
                                </List>
                                <Divider />
                            </>
                        )
                    })}
                        {/* <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <FastfoodIcon />
                                </ListItemIcon>
                                <ListItemText primary="Luigi's Pizza" />
                            </ListItemButton>
                        </List>
                        <Divider />
                        <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <FastfoodIcon />
                                </ListItemIcon>
                                <ListItemText primary="Big Bob's Smoked Barbeque" />
                            </ListItemButton>
                        </List>
                        <Divider />
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <DinnerDiningIcon />
                                </ListItemIcon>
                                <ListItemText primary="Steaks on the Grill" />
                            </ListItemButton>
                        </List>
                        <Divider />
                        <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                        <DinnerDiningIcon />
                                </ListItemIcon>
                                <ListItemText primary="Chicken Thighs & Zucchini in the Air Fryer" />
                            </ListItemButton>
                        </List>
                        <Divider />
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <DinnerDiningIcon />
                                </ListItemIcon>
                                <ListItemText primary="Pasta with Cream Sauce and Spinach" />
                            </ListItemButton>
                            </List>
                        <Divider />
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                <LocalDiningIcon />
                                </ListItemIcon>
                                <ListItemText primary="El Palenque Mexican Restaurant" />
                            </ListItemButton>
                        </List>
                        <Divider />
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <LocalDiningIcon />
                                </ListItemIcon>
                                <ListItemText primary="Outback Steakhouse - G'day Mate!" />
                            </ListItemButton>
                        </List>
                        <Divider />
                        <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                <LocalDiningIcon />
                                </ListItemIcon>
                                <ListItemText primary="Black & Blue Seafood and Steak" />
                            </ListItemButton>
                        </List> */}
                </List>
            </Box>
    )


    useEffect(() => {
        setItems(group.items)
    }, [group.items])

    return (
        <>
            <Typography variant="h4" sx={{textAlign: 'center'}}>Food Options</Typography>
            <Box sx={{textAlign: 'center', m:3}}>
                <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{m: 'auto'}}>
                    <Button onClick={toggleFilters} sx={filteredTypes.includes('Takeout') && {backgroundColor: theme.palette.primary.dark}} value='Takeout'>Take Out</Button>
                    <Button onClick={toggleFilters} sx={filteredTypes.includes('Eat In') && {backgroundColor: theme.palette.primary.dark}} value='Eat In'>Eat In</Button>
                    <Button onClick={toggleFilters} sx={filteredTypes.includes('Dine Out') && {backgroundColor: theme.palette.primary.dark}} value= 'Dine Out'>Dine Out</Button>
                </ButtonGroup>
            </Box>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                sx={{my: 3, display: 'flex'}}
                gap={1}
                >
                <TextField id="itemname" label="Item Name" variant="filled" type='text' sx={{flexGrow: 1}} required value={itemName} onChange={(e) => setItemName(e.target.value)}/>
                <FormControl variant="filled" sx={{width: '150px'}}>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        label="Type"
                        required
                        value={itemType}
                        onChange={(e) => setItemType(e.target.value)}
                        >
                        <MenuItem value='Takeout'><FastfoodIcon fontSize="small" sx={{mb: '-3px'}} />&nbsp;Takeout</MenuItem>
                        <MenuItem value='Eat In'><DinnerDiningIcon fontSize="small" sx={{mb: '-3px'}} />&nbsp;Eat In</MenuItem>
                        <MenuItem value='Dine Out'><LocalDiningIcon fontSize="small" sx={{mb: '-3px'}} />&nbsp;Dine Out</MenuItem>
                    </Select>
                </FormControl>
                <Button type='submit' variant="contained">Add Item</Button>
            </Box>
            {itemList}
        </>
    )
}

export default ItemLists