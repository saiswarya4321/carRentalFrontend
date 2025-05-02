import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Button, Container } from 'react-bootstrap';

function Getbooking() {

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const [bookings, setBookings] = useState([])

   useEffect(()=>{
    const getBooking= async()=>{
        try {
            const res= await axios.get(`${baseUrl}/booking/getbooking`,{
                withCredentials:true
            })
            console.log(res.data)
            setBookings(res.data)
        } catch (error) {
            console.error(error);
        }
    }
    getBooking()
   },[])
    return (
        <Container className="my-4 d-flex justify-content-center">
             {bookings.length===0? (<h3>No Bookings Found</h3>):(
             bookings.map((booking,index)=>{
                return    (
            <Card className="shadow-sm text-center" style={{ maxWidth: '600px', width: '100%' }} key={index}>
               
                        <Card.Body>
                        <Card.Title>{booking.model}</Card.Title>
                        <Card.Subtitle className="mb-3 text-muted">Booked by: {booking.userId}</Card.Subtitle>
                        <Card.Text>
                            <strong>Day:</strong> {booking.days}<br />
                            <strong>Payment Status:</strong> {booking.paymentStatus}<br />
                            <strong>Booking Status:</strong>{booking.status} <br />
                            <strong>Total Price:</strong> {booking.totalAmount}<br />
                            <strong>Car:</strong> {booking.carId} <br />
                        </Card.Text>
                        {/* <div className="d-flex justify-content-end">
                            <Button variant="danger">Cancel Booking</Button>
                        </div> */}
                    </Card.Body>
                  
               
            </Card>
              )
            }))}
        </Container>
    )
}

export default Getbooking