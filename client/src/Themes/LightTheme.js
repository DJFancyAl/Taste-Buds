import { createTheme } from '@mui/material/styles';

export const LightTheme = createTheme({
    palette: {
      type: 'light', // This specifies the theme type as light
      primary: {
        main: '#2196F3', // Define your primary color
      },
      secondary: {
        main: '#FFC107', // Define your secondary color
      },
      background: {
        main: '#00E6AB'
      }
    },
    typography: {
      fontFamily: 'Roboto, sans-serif', // Set your preferred font family
      fontSize: 16, // Set your base font size
    },
});