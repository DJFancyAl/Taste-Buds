import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../Context/UserContext';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ItemLists from '../ItemLists';
import Selections from '../Selections';
import axios from 'axios';

const Today = () => {
  const { user } = useContext(UserContext)
  const [today, setToday] = useState({group: {items: []}})

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


  return (
    <Box sx={{m: 4}}>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={6}>
          <ItemLists group={today.group} />
        </Grid>
        <Grid item xs>
          <Selections />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Today