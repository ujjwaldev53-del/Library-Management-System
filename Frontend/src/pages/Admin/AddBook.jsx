import { useState } from "react";
import axios from "axios";
import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './AddBook.css'


import React from 'react'

const AddBook = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        totalCopies: '',
        genre: '',
        publishedYear: ''
    });
        const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { user } = useAuth()
    useEffect(() => {
        if (user?.role !== 'admin') {
            navigate('/login')
        }
    }, [user, navigate])

    const handleChange =  (e) => {
        setFormData({...formData , [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e) => {
       try{
        e.preventDefault()
        setLoading(true)
        const addBookToken = localStorage.getItem('token')
        const respone = await axios.post(`http://localhost:5000/api/books` ,
        formData,
        { headers: { Authorization: `Bearer ${addBookToken}` } })
        alert("Book added!")
        navigate('/books')
        setLoading(false)
       }
       catch(error){
        alert(error.response?.data?.message)
       
       }finally {
        setLoading(false);
    }
    }
    return (
        <div className="addbook-container">
            <h1>Add New Book</h1>

            <form onSubmit={handleSubmit} className="addbook-form">
                
            <label>Title</label>
                <input name="title"value={formData?.title} placeholder="Title" onChange={handleChange} required />
                <label>Author</label>
                <input name="author"value={formData?.author} placeholder="Author" onChange={handleChange} required />
                <label>Total Copies</label>
                <input name="totalCopies" type="number"value={formData?.totalCopies} onChange={handleChange} required />
                <label>Isbn</label>
                <input name="isbn" type="text"value={formData?.isbn} onChange={handleChange} required />
                <label>Genre</label>
                <input name="genre"value={formData?.genre} placeholder="Genre" onChange={handleChange} />
                <label>Published Year</label>
                <input name="publishedYear" type="number" value={formData?.publishedYear} onChange={handleChange} placeholder="Year" />
                <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Adding...' : 'Add Book'}
                </button>
            </form>
        </div>
    )
}

export default AddBook
