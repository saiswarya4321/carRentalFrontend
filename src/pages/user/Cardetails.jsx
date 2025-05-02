import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { loadStripe } from '@stripe/stripe-js';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHED_KEY_STRIPE);
console.log(import.meta.env.VITE_PUBLISHED_KEY_STRIPE);

function Cardetails() {
  const { id } = useParams();
  const [cars, setCar] = useState({});
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [days, setDays] = useState(1);

  const user = useSelector((state) => state.user);  // Get the user from Redux
  const user_id = user?._id;  // Get the user ID from Redux
  console.log("User from Redux:", user);

  useEffect(() => {
    axios.get(`${baseUrl}/cars/getcars/${id}`)
      .then((res) => {
        console.log(res.data);
        setCar(res.data);
      })
      .catch((err) => {
        console.error("Error fetching car details:", err);
      });
  }, [id]);

  const makePayment = async () => {
    if (!cars || !cars._id) {
      console.error("Invalid car data:", cars);
      return;  // Prevent further execution if car data is invalid
    }
    console.log("Car data before payment:", cars);

    const body = {
      products: cars,
      days: days,
      userId: user_id,
    };
    try {
      localStorage.setItem("carId", cars._id);
      localStorage.setItem("days", days);
      localStorage.setItem("carData", JSON.stringify(cars));  // Add JSON.stringify

      const res = await axios.post(`${baseUrl}/payment/makepayment`, body);
      console.log("Response", res);

      const session = res.data.sessionId;
      const stripe = await stripePromise;
      if (stripe) {
        const result = await stripe.redirectToCheckout({ sessionId: session });
        if (result.error) {
          console.log(result.error.message);
        } else {





          navigate('/payment/success', {
            state: {
              car: cars,
              userId: user_id,
              paymentDetails: {
                status: "completed",
                amount: cars.pricePerDay * days,
                sessionId: session,
                days: days,
              },
            },
          });
        }
      } else {
        console.log("Stripe failed to load");
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <Container  style={{width:'500px' }}  className='text-center'>
      <Row>
        <Form.Group className="mb-3">
          <Form.Label>Number of Days</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          />
        </Form.Group>
        <Col>
          <div>
            <Card className="text-center card">
              <Card.Img  src={cars.image} className="img-fluid" style={{ height: '250px', objectFit: 'cover' }} variant='top'/>
              <Card.Body>
                <Card.Title>{cars.model}</Card.Title>
                <Card.Text>{cars.brand}</Card.Text>
                <Card.Title>{cars.year}</Card.Title>
                <Card.Title>{cars.registrationNumber}</Card.Title>
                <Card.Title>{cars.location}</Card.Title>
                <Card.Text>{cars.description}</Card.Text>
                <Card.Text>{cars.pricePerDay}</Card.Text>
                <Card.Title>{cars.vehicleNumber}</Card.Title>
                <Card.Text>
                  Availability: {cars.availability ? "Available" : "Not available"}
                </Card.Text>
                <Button variant="danger" onClick={makePayment}>
                  Book
                </Button>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Cardetails;
