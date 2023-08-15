import { createTheme } from '@mui/material/styles';

export const LightTheme = createTheme({
  palette: {
    type: 'light', // This specifies the theme type as dark
    primary: {
      main: '#367287', // Define your darker primary color
      light: '#5d8395', // Define your darker primary color
    },
    secondary: {
      main: '#a2fd01', // Define your darker secondary color
      light: '#b4fe33', // Define your darker secondary color
      dark: '#b3ec4e', // Define your darker secondary color
    },
    background: {
      main: '#5d8395',
      light: '#f4f7f7'
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Set your preferred font family
    fontSize: 16, // Set your base font size
    h1: {
      color: '#a2fd01', // Set the font color to white
    },
    h2: {
      color: '#f4f7f7', // Set the font color to white
    },
    h3: {
      color: '#a2fd01', // Set the font color to white
    },
    h4: {
      color: '#f4f7f7', // Set the font color to white
    },
    h5: {
      color: '#a2fd01' // Set the font color to white
    },
    h6: {
      color: '#f4f7f7', // Set the font color to white
    },
    subtitle1: {
      color: '#f4f7f7'
    },
    subtitle2: {
      color: '#a2fd01'
    },
    body2: {
      color: '#f4f7f7'
    },
    caption: {
      color: '#b3ec4e'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          backgroundColor: '#fff', // Set the background color to dark blue
          color: '#ffffff', // Set the text color to white
          borderRadius: 10, // Round the corners of the button
          padding: '10px 20px', // Increase the padding of the button
        },
        contained: {
          color: '#b3ec4e'
        }
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          color: '#f4f7f7',
          borderColor: 'rgba(180, 254, 51, 0.15)',
          '&::before, ::after': {
            borderColor: 'rgba(180, 254, 51, 0.15)',
          }
        },
      }
    },
  
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#f4f7f7',
          "&.Mui-focused": {
            color: '#b3ec4e',
          }
        },
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#f4f7f7'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#367287'
        },
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#5d8395',
          color: '#f4f7f7'
        }
      }
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: '#367287',
          color: '#b3ec4e'
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: '#f4f7f7'
        }
      }

    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#b3ec4e'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#367287',
          borderRadius: 0
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#367287',
          "&:focused": {
            backgroundColor: '#367287',
          }
        }
      }
    }
  },
});