import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Dealerhome() {
  return (
    <div>
        <Container className="py-5">
      <h2 className="text-center mb-4">Welcome to Dealer Dashboard</h2>
      
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="mb-4 shadow-sm border-0">
            <Card.Body>
              <Card.Title>Add a New Car</Card.Title>
             
           <Link to="/dealerdashboard/addcar"> <Button variant="primary">Add Car</Button></Link>  
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4 shadow-sm border-0">
            <Card.Body>
              <Card.Title>Manage Listings</Card.Title>
              
              <Link to="/dealerdashboard/viewcars"> <Button variant="primary">View Listings</Button></Link> 
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4 shadow-sm border-0">
            <Card.Body>
              <Card.Title>Booking List</Card.Title>
              
              <Link to="/dealerdashboard/booking"> <Button variant="primary">View Bookings</Button></Link> 
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
    </div>
  )
}

export default Dealerhome