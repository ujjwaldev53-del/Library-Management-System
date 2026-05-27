import React from 'react'
import Landing from './pages/Landing'
import Register  from './pages/Register'
import Login from './pages/Login'
import { Route , Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <>
    <Routes>
  <Route path = "/" element = {<Landing />} />
   <Route path = "/Register" element = {<Register />} /> 
   <Route path ="/Login" element={<Login />} />
  <Route path = "/Dashboard" element={<Dashboard/>} />
   </Routes>
   </>
  )
}

export default App
