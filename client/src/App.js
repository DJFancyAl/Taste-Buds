import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { LightTheme } from './Themes/LightTheme';
import { DarkTheme } from './Themes/DarkTheme';
import { ThemeProvider } from "@mui/material";
import { ThemeContext } from "./Context/ThemeContext";
import Paper from '@mui/material/Paper';
import Start from './Components/Pages/Start'
import Register from "./Components/Pages/Register";
import User from "./Components/Pages/User";
import Today from "./Components/Pages/Today";
import Group from "./Components/Pages/Group";
import Profile from "./Components/Pages/Profile";
import './app.css'

function App() {
  // State
  const [darkMode, setDarkMode] = useState(true)
  const theme = darkMode ? DarkTheme : LightTheme

  // Retrieves Dark Mode from Local Storage
  useEffect(() => {
    const usingDarkMode = localStorage.getItem('darkMode')
    if(usingDarkMode){
      const darkModeJSON = JSON.parse(usingDarkMode)
      setDarkMode(darkModeJSON)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{darkMode, setDarkMode}}>
      <AppContent theme={theme} />
    </ThemeContext.Provider>
  )
}

function AppContent({theme}) {
  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{maxWidth:'100vw', minHeight: '100vh', borderRadius:'0', bgcolor: theme.palette.background.main}}>
        <Router>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<User />}>
              <Route index element={<Today />} />
              <Route path="today" element={<Today />} />
              <Route path="group" element={<Group />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
