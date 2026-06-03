import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Books.css'
import { useAuth } from '../context/AuthContext'
const Books = () => {

  const [books, setBook] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate();
  
  const { user } = useAuth()
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingBook, setEditingBook] = useState(null)

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



  const deleteBook = async (bookId) => {
    try {
      const deleteBookToken = localStorage.getItem('token')
      const response = await axios.delete(`http://localhost:5000/api/books/${bookId}`,
        { headers: { Authorization: `Bearer ${deleteBookToken}` } }

      )
      alert("Book deleted successfully")
      setBook(prevBooks => prevBooks.filter(book => book._id !== bookId))
    }
    catch (error) {
      alert(error.response?.data?.message || 'Delete failed')
    }
  }
  const handleEditClick = async (book) => {
    setEditModalOpen(true)
    setEditingBook(book)

  }
  const handleEditSubmit = async (updatedData) => {
    try {
      const handleEditSubmitToken = localStorage.getItem('token')
      const handleEditSubmitResponse = await axios.put(`http://localhost:5000/api/books/${editingBook._id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${handleEditSubmitToken}` } }

      )
      alert("Book updated")
      setEditModalOpen(false)

      setBook(prevBooks => prevBooks.map(book =>
        book._id === editingBook._id ? { ...book, ...updatedData } : book
      ));
    }
    catch (error) {
      alert(error.response?.data?.message || 'Updation failed')
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
      <>
       <button className="back-to-dashboard" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>
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

              {
                user?.role == 'admin' && (
                  <div className="adminBtn">
                    <button className='editBtn' onClick={() => handleEditClick(book)}>Edit Book</button>
                    <button className='deleteBtn' onClick={() => deleteBook(book._id)}>Delete Book</button>
                  </div>
                )
              }

            </div>


          ))


          }

        </div>
        {editModalOpen && editingBook && (
          <div className="modal-overlay">
            <div className='modal-content'>
              <h2> Edit Book</h2>

              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const updatedData = {
                  title: formData.get('title'),
                  author: formData.get('author'),
                  totalCopies: parseInt(formData.get('totalCopies')),
                  genre: formData.get('genre'),
                  publishedYear: parseInt(formData.get('publishedYear'))
                }
                handleEditSubmit(updatedData);
              }}>
                <input name="title" defaultValue={editingBook?.title} placeholder="Title" required />
                <input name="author" defaultValue={editingBook?.author} placeholder="Author" required />
                <input name="totalCopies" type="number" defaultValue={editingBook?.totalCopies} required />
                <input name="genre" defaultValue={editingBook?.genre} placeholder="Genre" />
                <input name="publishedYear" type="number" defaultValue={editingBook?.publishedYear} placeholder="Year" />
                <div className="modal-buttons">
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditModalOpen(false)}>Cancel</button>
                </div>
              </form>

            </div>
          </div>
        )}
      </>


    )
  }


}
export default Books




// Name: Ujjwal Admin
// Email: ujjwal.admin@library.com
// Password: ujjwal@123
// Role: admin