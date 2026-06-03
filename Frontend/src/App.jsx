import React from 'react'
import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Books from './pages/Books'
import MyBorrow from './pages/MyBorrow'
import AddBook from './pages/Admin/AddBook'
import Seats from './pages/Seats'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Books" element={<Books />} />
        <Route path="/my-borrows" element={<MyBorrow />} />
        <Route path="/admin/add-book" element={<AddBook />} />
        <Route path="/seats" element={<Seats />} />
      </Routes>
    </>
  )
}

export default App
