import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 const navigate = useNavigate();
  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    try {
     const response = await axios.post("http://localhost:5000/api/auth/login",
        { email, password })
        localStorage.setItem('token' , response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
      navigate("/dashboard")
    }
    catch (error) {
      alert(error.response.data.message || "Login Failed Please try again")
    }  }
    return (
      <div className="login-page">
        <div className="loginFormBakground">
          <form action="#" onSubmit={handleLoginSubmit}>
            <label htmlFor="Email">Email</label>
            <input type="email" placeholder='Enter Your Email' value={email} id='email' onChange={(e) => {
              setEmail(e.target.value)
            }} />

            <label htmlFor="Password">Password</label>
            <input type="password" placeholder='Enter Yor Password' value={password} id="password" onChange={(e) => {
              setPassword(e.target.value)
            }} />

            <div className="loginSubmitButton">
              <button type='submit' className='submitLoginBtn' >Submit</button>
            </div>
          </form >
        </div>
      </div>
    )


}
export default Login
