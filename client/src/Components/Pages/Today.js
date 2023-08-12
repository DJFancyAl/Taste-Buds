import { useState, useEffect, useContext } from 'react'
import { DragDropContext } from "react-beautiful-dnd";
import { UserContext } from '../../Context/UserContext';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ItemLists from '../ItemLists';
import Selections from '../Selections';
import axios from 'axios';

const Today = () => {
  const defaultChoices = [{type:'', name: 'Top Selection!'}, {type:'', name: 'Second Choice'}, {type:'', name: 'Third Option'}]
  const { user } = useContext(UserContext)
  const [today, setToday] = useState({group: {items: []}})
  const [choices, setChoices] = useState(defaultChoices)

  const getToday = async () => {
    try {
      const response  = await axios.get(`http://localhost:5000/days/${user.group}/today`)
      setToday(response.data)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getToday()
  }, [])


  // Handle Drag End
  const onDragEnd = (result) => {
    const { source, destination } = result

    if(!destination) return
    if(destination.droppableId === source.droppableId && destination.index === source.index) return

    let add
    let availableItems = today.group.items
    let selectedItems = choices

    if(source.droppableId === 'AvailableItems') {
      add = availableItems[source.index]
      availableItems.splice(source.index, 1)
    }
    
    if(source.droppableId === 'AvailableItems') {
      availableItems.splice(destination.index, 0, add)
    }
    
    if(source.droppableId === 'SelectedItems') {
      add = selectedItems[source.index]
      selectedItems.splice(source.index, 1)
    }
    
    if(source.droppableId === 'SelectedItems') {
      selectedItems.splice(destination.index, 0, add)
    }
  }

  return (
    <Box sx={{m: 4}}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            <ItemLists group={today.group} />
          </Grid>
          <Grid item xs>
            <Selections choices={choices} />
          </Grid>
        </Grid>
      </DragDropContext>
    </Box>
  )
}

export default Today