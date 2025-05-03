import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

function Allbooking() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [booking, setBooking] = useState([])

  useEffect(() => {
    const fetchAllBooking = async () => {
      try {
        const res = await axios.get(`${baseUrl}/admin/allbooking`)
        console.log(res.data)
        setBooking(res.data.booking)
        console.log(res.data.booking)
      } catch (error) {
        console.error('Failed to fetch booking', error);
      }
    }

    fetchAllBooking()
  }, [])




  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/admin/deletebooking/${id}`,{
        withCredentials:true
      })
      console.log("deleted")
      toast("Deleted", {
        position: "top-center"
      })
      setBooking(prevUsers => prevUsers.filter(book => book._id !== id));

    } catch (error) {
      console.log(error)
      toast("Failed", {
        position: "top-center"
      })
    }

  }

  const  hangleDeactivateBooking= async (id)=>{
    try {
      const res= await axios.patch(`${baseUrl}/admin/deactivatebooking/${id}`,{
        withCredentials:true
      })
      setBooking((prev) =>
        prev.map((booking) =>
          booking._id === id ? { ...booking, status: "inactive" } : booking
        )
      );
      console.log("Deactivated")
      toast("Deactivated", {
        position: "top-center"
      })
      
    } catch (error) {
      console.log(error)
      toast("Failed", {
        position: "top-center"
      })
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-3 text-primary">Booking List</h2>
      <div className="row mt-3">
        {booking.length > 0 ? (
          booking.map((book) => (
            <div className="col-12 col-md-6 col-lg-4 mb-3" key={book._id}>
              <div className="card">
                <div className="card-body">

                  <h6 className="card-title"><strong>User : </strong>{book.userId}</h6>
                  <h6 className="card-subtitle mb-2 text-muted"><strong>Car : </strong>{book.carId}</h6>
                  <p className="card-text">
                    <strong>Model : </strong> {book.model}
                    <br />
                    <strong>Total Amount : </strong> {book.totalAmount}
                    <br />
                    <strong>Payment Status : </strong> {book.paymentStatus}
                    <br />
                    <strong>Booking Status : </strong> {book.status}
                  </p>




                  <div className="d-flex gap-3">
  <button className="btn btn-danger" onClick={() => handleDelete(book._id)}>Delete</button>
  <button className="btn btn-warning" onClick={() => hangleDeactivateBooking(book._id)}>Deactivate</button>
</div>

                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  )
}

export default Allbooking