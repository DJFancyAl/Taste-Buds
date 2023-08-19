import { FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Droppable } from 'react-beautiful-dnd';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import FoodItem from './FoodItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import axios from 'axios';


interface Item {
    name: String
    type: String
}

interface ItemListsProps {
    group: {
        _id: string
        items: Item[]
    }
    items: Item[]
    setItems: (items: Item[]) => {}
    filteredTypes: String[]
    setFilteredTypes: (items: String[]) => {}
    filteredList: Item[]
    setFilteredList: (items: Item[]) => {}
}


const ItemLists = ( { group, items, setItems, filteredTypes, setFilteredTypes, filteredList, setFilteredList }: ItemListsProps) => {
    // State
    const theme = useTheme()
    const token = localStorage.getItem('token')
    const [itemName, setItemName] = useState('')
    const [itemType, setItemType] = useState('')
    const [snackOpen, setSnackOpen] = useState(false);
    const [alert, setAlert] = useState({severity: 'success', message:''})
    
    // Delete List Item
    const deleteItem = async (item: Item) => {
        setFilteredList(filteredList.filter(option => option !== item))
        setItems(items.filter(option => option !== item))
        try {
            const response  = await axios.put(`${process.env.REACT_APP_SERVER_URL}groups/${group._id}/items`,
            item, {headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}})
            setAlert({severity: 'success', message: 'Profile Updated!'})
            setSnackOpen(true)
        } catch(err) {
            setAlert({severity: 'error', message: 'Unable to delete item...'})
            setSnackOpen(true)
        }
    }


    // Toggle Filters
    const toggleFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
        const type = (e.target as HTMLInputElement).value

        if (filteredTypes.includes(type)) {
          setFilteredTypes(filteredTypes.filter((x) => x !== type))
        } else {
          setFilteredTypes([...filteredTypes, type])
        }
    }
    
    
    // Add Item
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try {
            const response  = await axios.post(`${process.env.REACT_APP_SERVER_URL}groups/${group._id}/items`,
            {'name': itemName, 'type': itemType},
            { headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}})
            const newItem: Item = response.data
            setItems([newItem, ...items])
            setItemName('')
            setItemType('')
        } catch(err) {
            console.log(err)
        }
    }


    // Handle Snackbar Close
    const handleClose = (e: Event | SyntheticEvent, reason: string) => {
        if (reason === 'clickaway') return;    
        setSnackOpen(false);
    };
    
    
    // Set Items
    useEffect(() => {
        setItems(group.items)
    }, [group])


    return (
        <>
            <Box sx={{height: '150px'}}>
                <Box sx={{textAlign: 'center', mb:3}}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{m: 'auto'}}>
                        <Button onClick={toggleFilters} sx={filteredTypes.includes('Takeout') ? {backgroundColor: theme.palette.primary.dark} : {}} value='Takeout'>Take Out</Button>
                        <Button onClick={toggleFilters} sx={filteredTypes.includes('Eat In') ? {backgroundColor: theme.palette.primary.dark} : {}} value='Eat In'>Eat In</Button>
                        <Button onClick={toggleFilters} sx={filteredTypes.includes('Dine Out') ? {backgroundColor: theme.palette.primary.dark} : {}} value= 'Dine Out'>Dine Out</Button>
                    </ButtonGroup>
                </Box>
                <Box
                    component="form"
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
            </Box>

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
            <Snackbar
                open={snackOpen}
                autoHideDuration={4000}
                onClose={handleClose}
                ><Alert variant="filled" severity={alert.severity as AlertColor}>{alert.message}</Alert></Snackbar>
        </>
    )
}

export default ItemLists