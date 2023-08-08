import { createTheme } from '@mui/material/styles';

export const DarkTheme = createTheme({
    palette: {
      type: 'dark', // This specifies the theme type as dark
      primary: {
        main: '#3D3D3D', // Define your darker primary color
      },
      secondary: {
        main: '#FFA000', // Define your darker secondary color
      },
      background: {
        main: '#007859'
      }
    },
    typography: {
      fontFamily: 'Roboto, sans-serif', // Set your preferred font family
      fontSize: 16, // Set your base font size
    }
});