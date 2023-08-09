import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LightTheme } from './Themes/LightTheme';
import { DarkTheme } from './Themes/DarkTheme';
import { ThemeProvider } from "@mui/material";
import { ThemeContext } from "./Context/ThemeContext";
import Paper from '@mui/material/Paper';
import Start from "./Components/Pages/Start";
import Register from "./Components/Pages/Register";
import User from "./Components/Pages/User";

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const theme = darkMode ? DarkTheme : LightTheme

  return (
    <ThemeContext.Provider value={{darkMode, setDarkMode}}>
      <AppContent theme={theme} />
    </ThemeContext.Provider>
  )
}


function AppContent({theme}) {
  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{width: '100vw', maxWidth:'100vw', minHeight: '100vh', borderRadius:'0', bgcolor: theme.palette.background.main}}>
        <Router>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </Router>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
