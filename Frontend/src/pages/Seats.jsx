import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Seats.css'



const Seats = () => {
    const [seats, setSeats] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user } = useAuth()
    const [showAddModel, setShowAddModel] = useState(false)
    const [newSeat, setNewSeat] = useState({ seatNumber: '', slot: '' })

    const navigate = useNavigate()


    const bookSeat = async (seatId, slot) => {
        try {
            const bookSeatToken = localStorage.getItem('token')
            const response = await axios.post('http://localhost:5000/api/seats/book',
                { seatId, slot },
                { headers: { Authorization: `Bearer ${bookSeatToken}` } }
            )
            alert('You Booked Seat Sucessfully')
            fetchSeats()
        }
        catch (error) {
            alert(error.response?.data?.message)
        }

    }

    const fetchSeats = async () => {
        try {
            const seatsToken = localStorage.getItem('token')
            const response = await axios.get("http://localhost:5000/api/seats",
                { headers: { Authorization: `Bearer ${seatsToken}` } }

            )
            setSeats(response.data.seats)
            setLoading(false)
        }
        catch (error) {
            alert(error.response?.data?.message)
        }
    }


    const handleAddSeat = async () => {
        try {
            const handleAddSeatToken = localStorage.getItem('token')
            const res = await axios.post("http://localhost:5000/api/seats/admin",
                { seatNumber: newSeat.seatNumber, slot: newSeat.slot || undefined },
                { headers: { Authorization: `Bearer ${handleAddSeatToken}` } }
            )
            alert("You Added Seat Sucessfully")
            fetchSeats()
            setShowAddModel(false)         
            setNewSeat({ seatNumber: '', slot: '' })
        }
        catch (error) {
            alert(error.response?.data?.message)
        }
    }




    useEffect(() => {

        fetchSeats()
    }, [])


    const cancelBooking = async (seatId) => {
        try {
            const cancelBookingToken = localStorage.getItem('token')
            const response = await axios.put(`http://localhost:5000/api/seats/cancel/${seatId}`,
                {},
                { headers: { Authorization: `Bearer ${cancelBookingToken}` } }

            )
            alert("Your Booking Cancelled Sucessfully")
            fetchSeats();
        }
        catch (error) {
            alert(error.response?.data?.message)
        }
    }


    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    if (seats.length === 0) return <p>No seats available</p>


    return (
        <>
          <button className="back-to-dashboard" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>
            {
                user?.role === 'admin' && (
                    <button className='addSeatBtn' onClick={() => setShowAddModel(true)} >Add New Seat</button>
                )
            }
            <div className="seats-grid" >
                {seats.map(seat => (
                    <div key={seat._id} className="seat-card">
                        <h3>Seat {seat.seatNumber}</h3>
                        {seat.slot && <p>Slot: {seat.slot}</p>}
                        <p> Status : {seat.status}</p>
                        {
                            seat.status === 'available' && (
                                <button onClick={() => bookSeat(seat._id, seat.slot)}>Book</button>
                            )
                        }
                        {
                            seat.status === 'booked' && seat.bookedBy === user?.id && (
                                <button onClick={() => cancelBooking(seat._id)}>Cancel Booking</button>
                            )
                        }
                        {
                            seat.status === 'booked' && seat.bookedBy !== user?.id && (
                                <button disabled>Booked</button>
                            )
                        }
                    </div>
                ))
                }
            </div>
            {
                showAddModel == true && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <form onSubmit={(e) => e.preventDefault()}>
                            <label>Seat Number</label>
                                <input
                                    type="text"
                                    value={newSeat.seatNumber}
                                    onChange={(e) => setNewSeat({ ...newSeat, seatNumber: e.target.value })}
                                />
                                <label>Slot (optional)</label>
                                <input
                                    type="text"
                                    value={newSeat.slot}
                                    onChange={(e) => setNewSeat({ ...newSeat, slot: e.target.value.toLowerCase() })}
                                />
                                <button className='formAddSeatBtn' onClick={handleAddSeat}>Add</button>
                                <button className='formCancelSeatBtn' onClick={() => { setShowAddModel(false) }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </>

    )
}

export default Seats

//div className="seats-grid"