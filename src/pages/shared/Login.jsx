import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveuser } from '../../redux/Userslice';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';

function Login() {

  

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { darkMode } = useTheme();

  const [data, setData] = useState({ email: '', password: '', role: 'user' });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  axios.defaults.withCredentials = true;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, role } = data;
    setData({ email: '', password: '', role });

    let endpoint = '';
    switch (role) {
      case 'admin':
        endpoint = `${baseUrl}/admin/login`;
        break;
      case 'dealer':
        endpoint = `${baseUrl}/dealer/login`;
        break;
      default:
        endpoint = `${baseUrl}/user/login`;
        break;
    }

    try {
      const response = await axios.post(
        endpoint,
        { email, password },
        { withCredentials: true }
      );

      const token = response.data.token;
      localStorage.setItem('token', token);

      toast.success("Login successful");
      dispatch(saveuser(response.data.userExist || response.data.adminExist));

      if (role === 'admin') navigate('/admindashboard/adminhome');
      else if (role === 'dealer') navigate('/dealerdashboard/dealerhome');
      else navigate('/userdashboard/homepage');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Invalid credentials');
    }
  };

  const inputClasses = `form-control rounded-3 ${darkMode ? 'bg-secondary text-white border-0' : ''}`;
  const selectClasses = `form-select rounded-3 ${darkMode ? 'bg-secondary text-white border-0' : ''}`;

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <Card className={`shadow-lg border-0 rounded-4 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
            <Card.Body className="p-5">
              <h2 className="mb-4 text-center fw-bold">Login</h2>
              <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label fw-semibold">Role</label>
                  <select
                    className={selectClasses}
                    id="role"
                    name="role"
                    value={data.role}
                    onChange={handleChange}
                  >
                    <option value="user">User</option>
                    <option value="dealer">Dealer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">Email address</label>
                  <input
                    type="email"
                    className={inputClasses}
                    id="email"
                    placeholder="Enter your email"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    className={inputClasses}
                    id="password"
                    placeholder="Enter your password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                  />
                </div>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 rounded-3 fw-semibold"
                >
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
