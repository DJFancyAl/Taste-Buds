import React, { useState } from "react";
import { LightTheme } from "./Themes/LightTheme";
import { DarkTheme } from "./Themes/DarkTheme";
import { ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Start from "./Components/Pages/Start";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const theme = darkMode ? DarkTheme : LightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{minWidth: '100vw', minHeight: '100vh', borderRadius:'0', bgcolor: theme.palette.background.main}}>
        <Start />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
