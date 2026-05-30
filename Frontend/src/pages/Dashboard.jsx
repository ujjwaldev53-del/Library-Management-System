import React from 'react'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Dashboard.css"


const Dashboard = () => {
    const {user , logout} = useAuth()
const navigate = useNavigate()
console.log("User object:", user);


useEffect (()=> {
    
if(!user){
    navigate("/login")
}
} ,[user, navigate])
  return (
    <div>
 <div className="dashboard-container">
    <h1>Dashboard</h1>
    <h3>Hello : {user?.name}</h3>
    <p>Email  : {user?.email}</p>
    <p>Role  : {user?.role}</p>
    <button className="logoutBtn" onClick={logout}>Logout</button>
    <button className="getBookBtn" onClick={() =>navigate('/books')}>Get Books</button>
    <button className="my-borrows-btn" onClick={() => navigate('/my-borrows')}>
    My Borrowed Books
</button> </div>
 
    </div>
  )
}

export default Dashboard
