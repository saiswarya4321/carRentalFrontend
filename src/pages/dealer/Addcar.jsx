import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';


function AddCar() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    registrationNumber: '',
    location: '',
    description: '',
    vehicleNumber: '',
    pricePerDay: ''
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

   
    data.append("brand", formData.brand);
    data.append("model", formData.model);
    data.append("year", formData.year);
    data.append("registrationNumber", formData.registrationNumber);
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("vehicleNumber", formData.vehicleNumber);
    data.append("pricePerDay", formData.pricePerDay);
    data.append("image", image);

    try {
      const response = await axios.post(`${baseUrl}/cars/create`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      console.log(response.data);
      alert('Car added successfully!');
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert('Failed to add car!');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 ">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg p-4 rounded-4">
            <Card.Body>
              <h2 className="text-center mb-4">Add Car</h2>
              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                {[
                  { label: "Brand", name: "brand" },
                  { label: "Model", name: "model" },
                  { label: "Year", name: "year", type: "number" },
                  { label: "Registration Number", name: "registrationNumber" },
                  { label: "Location", name: "location" },
                  { label: "Description", name: "description" },
                  { label: "Vehicle Number", name: "vehicleNumber" },
                  { label: "Price Per Day", name: "pricePerDay", type: "number" },
                ].map((field, idx) => (
                  <Form.Group key={idx} className="mb-3">
                    <Form.Label className="fw-semibold">{field.label}</Form.Label>
                    <Form.Control
                      type={field.type || "text"}
                      name={field.name}
                      placeholder={field.label}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      className="rounded-3"
                    />
                  </Form.Group>
                ))}

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Car Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    required
                    className="rounded-3"
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100 fw-semibold rounded-3">
                  Add Car
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddCar;
