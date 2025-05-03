import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Homepage() {
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  

  const [query, setQuery] = useState('');
  const [cars, setCar] = useState([]);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  axios.defaults.withCredentials = true;

  const fetchCars = async (searchQuery = '') => {
    try {
      const res = await axios.get(`${baseUrl}/cars/listcar?search=${searchQuery}`, {
        withCredentials: true,
      });

      const fetchedCars = res.data?.carList || [];

      if (fetchedCars.length === 0) {
        toast.error("No data found!");

        // Restore from localStorage
        const stored = localStorage.getItem("carList");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setCar(parsed);
          }
        }
        return;
      }

      // Set and store new car list
      setCar(fetchedCars);
      localStorage.setItem("carList", JSON.stringify(fetchedCars));
    } catch (error) {
      console.error("Axios error:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || error.message || "Something went wrong!", {
        toastId: "fetch-car-error",
      });
      navigate("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    // Load cached cars on initial load
    const storedCars = localStorage.getItem("carList");
    if (storedCars) {
      try {
        const parsedCars = JSON.parse(storedCars);
        if (Array.isArray(parsedCars)) {
          setCar(parsedCars);
        }
      } catch (e) {
        console.error("Error parsing local carList:", e);
      }
    }

    // Fetch fresh data
    fetchCars();
  }, []);

  // Auto search when query changes (especially when cleared)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCars(query);
    }, 500); // debounce for smoother experience

    return () => clearTimeout(delayDebounce);
  }, [query]);


  const handleUnavailable = async (car,e) => {
    try {
      if (!car.availability) {
        e.preventDefault();
        toast.error("This car is not available");
        navigate("/userdashboard/homepage");
       
      }
      // If needed, add more logic here for available cars
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
      <Form className="mb-3" onSubmit={(e) => {
        e.preventDefault();
        fetchCars(query); // Manual search on button click
      }}>
        <Row className="align-items-center justify-content-center ">
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button variant="primary" type="submit" onSubmit={fetchCars}>Search</Button>
          </Col>
        </Row>
      </Form>

      <Container className='mt-2'>
        <Row className='g-2'> 
          {cars.map((car) => (
            <Col key={car._id} xs={6} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Img  src={car.image}   style={{ height: '200px', objectFit: 'cover' }} className="card-img-top"/>
                <Card.Body>
                  <Card.Title>{car.brand} {car.model}</Card.Title>
                  <Card.Text>
                    Price per day : {car.pricePerDay}<br />
                    Location : {car.location}<br/>
                    Availability:    {car.availability ? "Available" : "Not available"}
                  </Card.Text>
                 
                  <Link to={`/userdashboard/cardetails/${car._id}`}>
                    <Button variant="danger" className='m-2' onClick={(e)=>{handleUnavailable(car,e)}}>MORE</Button>
                  </Link>
                  <Link to={`/userdashboard/reviews/${car._id}`}>
                    <Button variant="warning" className='m-2' >REVIEWS</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Homepage;
