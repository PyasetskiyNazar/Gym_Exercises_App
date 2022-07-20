import React from 'react'
import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import ExercisesDetails from './pages/ExercisesDetails';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercise/:id" element={<ExercisesDetails />} />
      </Routes>
      <Footer />
    </Box>
  )
}

export default App
