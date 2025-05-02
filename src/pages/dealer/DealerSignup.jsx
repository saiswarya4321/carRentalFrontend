import React, { useState } from 'react'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function DealerSignup() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const [data, setData] = useState({ name: "", email: "", password: "", confirmPassword: "", contactNumber: "", carId: "" })

    const handleChange = (event) => {
        setData((data) => ({ ...data, [event.target.name]: event.target.value }))

    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(data);

        setData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            contactNumber: "",
            carId: ""

        });
        const response = await axios.post(`${baseUrl}/dealer/register`, data)
        console.log(response, "*********response")
        navigate("/login")
    }



    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100 bg-light mt-3 mb-3">
            <Row className="w-100 justify-content-center mt-3 mb-3">
                <Col md={6} lg={5}>
                    <Card className="shadow-lg border-0 rounded-4">
                        <Card.Body className="p-5">
                            <h2 className="mb-4 text-center fw-bold">Create Account</h2>
                            <Form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-3"
                                        id="name"
                                        placeholder="Enter your full name" name='name' onChange={handleChange} value={data.name}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control rounded-3"
                                        id="email"
                                        placeholder="Enter your email" name='email' onChange={handleChange} value={data.email}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="contact" className="form-label fw-semibold">Contact Number</label>
                                    <input
                                        type="tel"
                                        className="form-control rounded-3"
                                        id="contact"
                                        placeholder="Enter contact number" name='contactNumber' onChange={handleChange} value={data.contactNumber}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label fw-semibold">Password</label>
                                    <input
                                        type="password"
                                        className="form-control rounded-3"
                                        id="password"
                                        placeholder="Create password" name='password' onChange={handleChange} value={data.password}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="confirmPassword" className="form-label fw-semibold">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control rounded-3"
                                        id="confirmPassword"
                                        placeholder="Confirm password" name='confirmPassword' onChange={handleChange} value={data.confirmPassword}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="carid" className="form-label fw-semibold">Car id</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-3"
                                        id="carId"
                                        placeholder="Car ID"
                                        name="carId"       // ✅ fixed: should match the data object key exactly
                                        onChange={handleChange}
                                        value={data.carId} // ✅
                                    />
                                </div>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 rounded-3 fw-semibold"
                                >
                                    Sign Up
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default DealerSignup