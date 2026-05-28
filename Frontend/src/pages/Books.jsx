import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './Books.css'
const Books = () => {
  const [books, setBook] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const borrowBook = async (bookId) => {
    try {
      const tokenToBorrowBook = localStorage.getItem('token')
      setBook(prevBooks => (
        prevBooks.map(book => book._id === bookId ? { ...book, availableCopies: book.availableCopies - 1 } : book)
      ))
      const res = await axios.post("http://localhost:5000/api/borrow", { bookId },
        { headers: { Authorization: `Bearer ${tokenToBorrowBook}` } }
      )
      alert("Book borrowed successfully")
    }
    catch (error) {
      alert(error.response?.data?.message)
    }

  }
  useEffect(() => {


    const fetchBook = async () => {
      try {
        const currentToken = localStorage.getItem('token')
        const response = await axios.get("http://localhost:5000/api/Books",
          { headers: { Authorization: `Bearer ${currentToken}` } })


        setBook(response.data.books)
        setLoading(false)
      }

      catch (error) {
        setError(error.message)
        setLoading(false)
        alert(error.response.data.message)
      }
    }

    fetchBook()





  }, [])

  if (loading) {
    return <p> Loading  Books ...</p>
  }
  if (error) {
    return <p>Error : {error}</p>
  }
  if (books.length === 0) {
    return <p>No Book Found</p>
  } else {
    return (
      <div className='book-grid' >

        {books.map((book) => (
          <div key={book._id} className='book-card' >
            <h3>{book.title}</h3>
            <p>Author  {book.author}</p>
            <p>Total Copies : {book.totalCopies}</p>
            <p>Available : {book.availableCopies}</p>
            {book.availableCopies > 0 ? (
              <button className="borrow-btn" onClick={() => borrowBook(book._id)}>Borrow</button>
            ) : (
              <button className="borrow-btn" disabled>Not Available</button>
            )}
          </div>

        ))

        }

      </div>
    )
  }


}
export default Books




