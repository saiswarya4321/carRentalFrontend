import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';




function Profile() {

    // const userId = useSelector((state) => state.user.user._id);
    // console.log(userId,"userid")
    const [user, setUser] = useState({})
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [password, setPassword] = useState("")
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${baseUrl}/user/profile`, { withCredentials: true })
                console.log(res.data, "user")
                const fetchUser=res.data.user
                setUser(fetchUser)
                setName(fetchUser.name)
            setEmail(fetchUser.email)
            setContactNumber(fetchUser.contactNumber)
            setPassword(fetchUser.password)
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            }

        }
        fetchProfile()

    }, [])
   
    const handleUpdate = async () => {
        try {

            const updateData = { name, email, password, contactNumber }
            const res= await axios.put(`${baseUrl}/user/update`,updateData,{withCredentials:true})
            console.log(res.data,"updated")
            toast.success("Your profile has been updated!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Update failed:", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`${baseUrl}/user/delete`, { withCredentials: true });
            toast.success(" profile deleted!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error("Delete failed:", error);
            toast.error("Update failed:", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className='container text-center mt-3'>
        <h2>Profile</h2>
        <Row className="justify-content-center mt-5">
            <Col xs={12} sm={8} md={6} lg={4}>
                <Card className="shadow-lg rounded">
                    <Card.Body>
                        <div className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Enter Name'
                            />
                        </div>

                        <div className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Email"
                            />
                        </div>

                        <div className="mb-3">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                type="number"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                placeholder="Enter Contact Number"
                            />
                        </div>

                        <div className="mb-3">
                            <Form.Label>Password (optional)</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter New Password (optional)"
                            />
                        </div>

                        <div className="d-flex justify-content-between">
                            <Button variant="outline-danger" onClick={handleDelete}>Delete</Button>
                            <Button variant="danger" onClick={handleUpdate}>Update</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
    )
}

export default Profile