import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

function Booking() {
  const [bookings, setBookings] = useState([]); // Store multiple bookings
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Fetch booking details when the component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${baseUrl}/booking/userbooking`); // Fetch all bookings for the user
        setBookings(response.data); // Set the response data which is an array of bookings
        console.log(response.data);  // Log to ensure we get the data in the correct structure
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (bookings.length === 0) {
    return <div>No bookings found for this user</div>;
  }

  const handleCancelBooking = async (bookingId) => {
    try {
      setLoading(true);
      await axios.patch(`${baseUrl}/booking/deletebooking/${bookingId}`);
      toast('Booking successfully canceled!');
      setBookings(bookings.filter(booking => booking._id !== bookingId)); // Remove canceled booking from state
    } catch (error) {
      console.error('Error canceling booking:', error);
      setError('Failed to cancel booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Your Bookings</h2>
      {bookings.map((booking) => {
        const { carId, _id: bookingId, totalAmount, paymentStatus, status } = booking;

        if (!carId) {
          return <div key={bookingId}>Error: Car information is missing in the booking.</div>;
        }

        return (
          <div key={bookingId} className="card shadow p-4 rounded mb-4">
            <h3>Car Model: {carId?.model || 'N/A'}</h3>
            <p><strong>Car ID:</strong> {carId?._id || 'N/A'}</p>
            <p><strong>Car Brand:</strong> {carId?.brand || 'N/A'}</p>
            <p><strong>Rental Price per Day:</strong> {carId?.pricePerDay || 'N/A'}</p>
            <p><strong>Total Amount:</strong> {totalAmount}</p>
            <p><strong>Payment Status:</strong> {paymentStatus}</p>
            <p><strong>Booking Status:</strong> {status}</p>

            <div className="mt-4">
              <h4><strong>Total Amount:</strong> {totalAmount}</h4>
            </div>
            <div className="mt-4">
              <Button
                variant="danger"
                onClick={() => handleCancelBooking(bookingId)}
                disabled={loading} // Disable button if loading is true
              >
                Cancel Booking
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Booking;
