
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Adminhome() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [totalUser, setTotalUser] = useState(0)
  const [totalDealer, setTotalDealer] = useState(0)
  const [totalBooking, setTotalBooking] = useState(0)
  const [totalCars, setTotalCars] = useState(0)

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get(`${baseUrl}/admin/allusers`)

        console.log("length of users", res.data.users.length)
        setTotalUser(res.data.users.length)
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    }

    fetchAllUsers()
  }, [])


  useEffect(() => {
    const fetchAllDealers = async () => {
      try {
        const res = await axios.get(`${baseUrl}/admin/alldealers`)

        console.log("length of users", res.data.dealers.length)
        setTotalDealer(res.data.dealers.length)
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    }

    fetchAllDealers()
  }, [])

  useEffect(() => {
    const fetchAllBooking = async () => {
      try {
        const res = await axios.get(`${baseUrl}/admin/allbooking`)

        console.log("length of booking", res.data.booking.length)
        setTotalBooking(res.data.booking.length)
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    }

    fetchAllBooking()
  }, [])

  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        const res = await axios.get(`${baseUrl}/admin/allcars`)

        console.log("length of booking", res.data.cars.length)
        setTotalCars(res.data.cars.length)
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    }

    fetchAllCars()
  }, [])


  return (
    <div>

      <Container fluid className="p-4  min-vh-100">
        <h2 className="mb-4 fw-bold text-primary">Welcome, Admin!</h2>

        {/* Summary Cards */}
        <Row className="mb-4 g-2">
          <Col md={4} >
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Total Users</Card.Title>
                <Card.Text className="fs-3 fw-semibold">{totalUser}</Card.Text>
                <Link to={'/admindashboard/allusers'}> <Button variant="danger" size="sm">View Users</Button></Link>

              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Total Dealers</Card.Title>
                <Card.Text className="fs-3 fw-semibold">{totalDealer}</Card.Text>
                <Link to={'/admindashboard/alldealers'}> <Button variant="danger" size="sm">View Dealers</Button></Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Total Bookings</Card.Title>
                <Card.Text className="fs-3 fw-semibold">{totalBooking}</Card.Text>
                <Link to={'/admindashboard/allbooking'}> <Button variant="danger" size="sm">View Booking</Button></Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Total Cars</Card.Title>
                <Card.Text className="fs-3 fw-semibold">{totalCars}</Card.Text>
                <Link to={'/admindashboard/allcars'}> <Button variant="danger" size="sm">View Cars</Button></Link>
              </Card.Body>
            </Card>
          </Col>

        </Row>

       
        
      </Container>

    </div>
  )
}

export default Adminhome