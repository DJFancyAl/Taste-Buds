import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ItemLists from '../ItemLists';

const Today = () => {
  return (
    <Box sx={{m: 4}}>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <ItemLists />
        </Grid>
        <Grid item xs={4}>
          <ItemLists />
        </Grid>
        <Grid item xs={4}>
          xs=4
        </Grid>
      </Grid>
    </Box>
  )
}

export default Today