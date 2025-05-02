import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



function DealerCars() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;  // Assuming you're using Vite for environment variables

  const user = useSelector((state) => state.user.user);

  const dealerId = user?._id;  // Get the user ID from Redux
  console.log("User from Redux:", user, dealerId);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cars for the logged-in dealer when the component is mounted
  useEffect(() => {
    if (!dealerId) {
      setError('Dealer not authenticated');
      setLoading(false);
      return;
    }

    const fetchCars = async () => {
      try {
        const response = await axios.get(`${baseUrl}/cars/cardetails/${dealerId}`, { withCredentials: true });
        setCars(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching cars');
        setLoading(false);
      }
    };

    fetchCars();
  }, [dealerId, baseUrl]);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
        <p>Loading cars...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        <strong>Error:</strong> {error}
      </Alert>
    );
  }
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/cars/delete/${id}`, {
        withCredentials: true
      })
      console.log("deleted")
      toast("Deleted")
      setCars(prev => prev.filter(car => car._id !== id));
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container className='text-center'>
      <Row className="mt-4 text-center">
        {cars.length > 0 ? (
          cars.map((car) => (
            <Col key={car._id} md={4}>
              <Card className="mb-4">
                <Card.Img variant="top" src={car.image || 'default_image.jpg'} />
                <Card.Body>
                  <Card.Title>{car.brand} {car.model}</Card.Title>
                  <Card.Text>
                    <strong>Year:</strong> {car.year} <br />
                    <strong>Registration Number:</strong> {car.registrationNumber} <br />
                    <strong>Location:</strong> {car.location} <br />
                    <strong>Description:</strong> {car.description} <br />
                    <strong>Price per Day:</strong> {car.pricePerDay}<br />
                    <strong>Availability:</strong> {car.available ? "available" : "Not available"}
                  </Card.Text>
                  <Link to={`/dealerdashboard/editcars/${car._id}`}> <Button variant="danger" className='m-2'>
                    Update
                  </Button></Link>

                  <Button variant="danger" onClick={() => handleDelete(car._id)}>
                    Delete
                  </Button>

                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <p>No cars found.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default DealerCars;
