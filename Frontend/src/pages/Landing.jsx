import React from 'react'
import './Landing.css'
import { useNavigate} from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div>
    <div className='landing-parent-container'>
      <div className="landing-container">
    <h1>Library Management System</h1>
    <p>
📚 <strong>Library Management System</strong> – Digitize your library with book management, 
borrow/return tracking, seat booking, and automated fine calculation. 
Fast, secure, and easy to use for students and librarians alike.
</p>
    <div className="landing-features">
        <div className="landing-card">📖 Book Management</div>
        <div className="landing-card">🔄 Borrow/Return</div>
        <div className="landing-card">💺 Seat Booking</div>
    </div>
    <button className="landing-btn" onClick={() => navigate('/register')}>Get Started</button>
</div>
   </div>
   </div>
  )
}

export default Landing
// day8 session 13


