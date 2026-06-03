import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MyBorrow.css'

const MyBorrow = () => {
    const [borrow , setBorrow] = useState([])
    const [loading , setLoading] = useState(true)
    const [error , setError] = useState(null)
    useEffect(() => { fetchBorrow()} , [])
    const returnBook = async (bookId)=> {
        try{

            const returnBookToken = localStorage.getItem('token')
            const res = await axios.put("http://localhost:5000/api/borrow/return" , 
            {bookId} ,
            {headers : {Authorization: `Bearer ${returnBookToken}`}}

            )
            fetchBorrow()

        }
        catch(error){
            alert(error.response?.data?.message || 'Return failed')
                }

    }
    const navigate = useNavigate()
    const fetchBorrow = async () => {
       
       try{
        const fetchBorrowToken = localStorage.getItem('token')
        const response = await axios.get("http://localhost:5000/api/borrow/my-borrows" , 
    {headers : {Authorization: `Bearer ${fetchBorrowToken}`}}
        )
         setBorrow(response.data.borrows),
         setLoading(false)
    }
         
        catch (error) {
            setError(error.message)
            setLoading(false)
            alert(error.response.data.message)
        }
    }
    if(loading){
        return <p> Loading Borrowed Books ..</p>
    }
    if(error){
        return <p>Error : {error}</p>
    }
    if(borrow.length === 0 ){
        return <p>No books borrowed yet.</p>
    }
    return (
        
        <div className="borrows-grid"  >

{borrow.map((borrowItem) => {
  if (!borrowItem.book) {
    return (
      <div key={borrowItem._id} className="borrow-card">
        <p>Book has been deleted or is unavailable.</p>
        <button className="return-btn" disabled>Return</button>
      </div>
    );
  }
  return (
    <>
      <button className="back-to-dashboard" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>
    <div key={borrowItem._id} className="borrow-card">
      <h3>{borrowItem.book.title}</h3>
      <p>Author: {borrowItem.book.author}</p>
      <p>Borrowed on: {new Date(borrowItem.borrowDate).toDateString()}</p>
      <p>Due date: {new Date(borrowItem.dueDate).toDateString()}</p>
      <button className="return-btn" onClick={() => returnBook(borrowItem.book._id)}>
        Return Book
      </button>
    </div>
    </>
  );
})}
       
        </div>
    )

    

}

export default MyBorrow
