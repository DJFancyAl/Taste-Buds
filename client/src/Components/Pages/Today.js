import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { DragDropContext } from "react-beautiful-dnd";
import { UserContext } from '../../Context/UserContext';
import Results from '../Results';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ItemLists from '../ItemLists';
import Selections from '../Selections';
import axios from 'axios';

const Today = () => {
  // State
  const navigate = useNavigate()
  const defaultChoices = [{type:'Placeholder', name: 'Top Selection!'}, {type:'Placeholder', name: 'Second Choice'}, {type:'Placeholder', name: 'Third Option'}]
  const { user } = useContext(UserContext)
  const [today, setToday] = useState({group: {items: []}, selections: []})
  const [items, setItems] = useState([])
  const [filteredTypes, setFilteredTypes] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [choices, setChoices] = useState(defaultChoices)

  // Get Today's Data
  const getToday = async () => {
    try {
      const token = localStorage.getItem('token')
      const response  = await axios.get(`http://localhost:5000/days/${user.group._id}/today`, {headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}})
      setToday(response.data)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getToday()
  }, [user])


  // Filter Items
  const filterItems = () => {
    if(filteredTypes.length === 0) {
        setFilteredList(items)
    } else {
        const filtered = items.filter((item) => {
            return filteredTypes.includes(item.type)
        })
        setFilteredList(filtered)
    }
  }


  // Handle Drag End
  const onDragEnd = (result) => {
    const { source, destination } = result

    if(!destination) return
    if(destination.droppableId === source.droppableId && destination.index === source.index) return

    let add
    let availableItems = filteredList
    let listedItems = items
    let selectedItems = choices

    if(source.droppableId === 'AvailableItems') {
      add = availableItems[source.index]
      availableItems.splice(source.index, 1)
      listedItems = listedItems.filter(item => item !== add)
    }
    
    if(source.droppableId === 'SelectedItems') {
      add = selectedItems[source.index]
      selectedItems.splice(source.index, 1)
    }

    if(destination.droppableId === 'AvailableItems') {
      availableItems.splice(destination.index, 0, add)
    }
    
    if(destination.droppableId === 'SelectedItems') {
      selectedItems.splice(destination.index, 0, add)

      if(selectedItems.length > 3) {
        for(let i=0; i < selectedItems.length; i++) {
          if(selectedItems[i].type === 'Placeholder') {
            selectedItems.splice(i, 1)
            break;
          }
        }
      }

      if(selectedItems.length > 3) {
        availableItems.unshift(selectedItems[3])
        selectedItems.pop()
      }
    }

    if(source.droppableId === 'SelectedItems' && destination.droppableId === 'AvailableItems') {
      const filtered = selectedItems.filter(x => x.type !== "Placeholder")
      if(filtered.length === 0) selectedItems.splice(0, 0, defaultChoices[0])
      if(filtered.length === 1) selectedItems.splice(1, 0, defaultChoices[1])
      if(filtered.length === 2) selectedItems.splice(2, 0, defaultChoices[2])
    }

    setChoices(selectedItems)
    setItems(listedItems)
  }


  // Filter List
  useEffect(() => {
    filterItems()
  }, [items, filteredTypes])


  // If user is not in a group, then redirect to the group page.
  useEffect(() => {
    if(!user.group) navigate('/user/group')
  }, [user])

  // If already submitted choices - display Result page.
  const submitted = today.selections.some((selection) => selection.member._id === user._id)
  if(submitted) return <Box sx={{p: 4}}><Results today={today} setToday={setToday} /></Box>

  return (
    <Box sx={{p: 2}}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            <ItemLists group={today.group} items={items} setItems={setItems} filteredTypes={filteredTypes} setFilteredTypes={setFilteredTypes} filteredList={filteredList ? filteredList : []} setFilteredList={setFilteredList} />
          </Grid>
          <Grid item xs>
            <Selections choices={choices} today={today} setToday={setToday} />
          </Grid>
        </Grid>
      </DragDropContext>
    </Box>
  )
}

export default Today