import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'
import { useState } from 'react'
import axios from 'axios'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('user')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', {

                name,
                email,
                password,
                role
            })
            alert("Registration Successfull")
            navigate("/login")
        }
        catch (error) {
            alert(error.response.data.message)
        }
    }



    return (
        <div className="register-page">
            <button className='backBtn' onClick={() => { navigate('/') }}>Back</button>
            <h1> Register</h1>
            <div className="formBakground">
                <form action="#" onSubmit={(handleSubmit)}>
                    <label htmlFor="Name">Name</label>
                    <input type="text" placeholder='Enter Your Name ' value={name} id='name' onChange={(e) => {
                        setName(e.target.value)
                    }} />
                    <label htmlFor="Email">Email</label>
                    <input type="email" placeholder='Enter Your Email' value={email} id='email' onChange={(e) => {
                        setEmail(e.target.value)
                    }} />

                    <label htmlFor="Password">Password</label>
                    <input type="password" placeholder='Enter Yor Password' value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} />


                    <label htmlFor="Role">Role</label>
                    <select name="role" id="role" value={role} onChange={(e) => {
                        setRole(e.target.value)
                    }}>
                        <option value="" disabled selected>-- Select Role --</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>

                    </select>




                    <div className="formInput">
                        <button type='submit' className='submitBn' onClick={() => {

                        }} >Submit</button>
                    </div>

                </form >
            </div>
        </div>
    )
}


export default Register 
