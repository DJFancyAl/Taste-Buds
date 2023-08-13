import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OptionList from './OptionList';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
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
    const [items, setItems] = useState(group.items)
    const [itemName, setItemName] = useState('')
    const [itemType, setItemType] = useState('')
    const [filteredTypes, setFilteredTypes] = useState([])
    const [filteredList, setFilteredList] = useState([])

    useEffect(() => {
        console.log('Updated')
    })

    // Toggle Filters
    const toggleFilters = (e) => {
        const type = e.target.value
        if (filteredTypes.includes(type)) {
            setFilteredTypes(filteredTypes.filter((x) => x !== type))
        } else {
            setFilteredTypes([...filteredTypes, type])
        }
    }

    
    // Filtered List
    useEffect(() => {
        if(filteredTypes.length === 0) {
            setFilteredList(items)
        } else {
            const filtered = items.filter((item) => {
                return filteredTypes.includes(item.type)
            })
            setFilteredList(filtered)
        }
    }, [items, filteredTypes])
    

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response  = await axios.post(`http://localhost:5000/groups/${group._id}/items`,
            {'name': itemName, 'type': itemType},
            {headers: {'Content-Type': 'application/json'}})
            
            console.log(response.data)
            setItems([response.data, ...items])
            setItemName('')
            setItemType('')
        } catch(err) {
            console.log(err)
          }
    }

    useEffect(() => {
        setItems(group.items)
    }, [group.items])

    return (
        <>
            <Box sx={{height: '150px'}}>
                <Box sx={{textAlign: 'center', mb:3}}>
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
            </Box>
            <OptionList items={filteredList} setItems={setItems} />
        </>
    )
}

export default ItemLists