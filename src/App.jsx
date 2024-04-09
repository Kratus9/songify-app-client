import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import HomePage from './pages/HomePage'
import "./index.css"


function App() {

  return (
    <Routes>
      <Route path='/home' element = {<HomePage/>} /> 
    </Routes>
  )
}

export default App
