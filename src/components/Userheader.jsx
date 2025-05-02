import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { persistor } from '../redux/store';
import { clearuser } from '../redux/Userslice';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';  // Importing the useTheme hook

function Userheader() {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { darkMode, toggleTheme } = useTheme();  // Extracting darkMode state and toggle function

  const handleLogout = async () => {
    try {
      await axios.post(`${baseUrl}/user/logout`)
        .then((res) => {
          persistor.purge();
          dispatch(clearuser());
          navigate("/login");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div> 
      <Navbar expand="lg" className={`shadow-sm mt-3 mb-3 ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
        <Container>
          <Navbar.Brand as={Link} to="/userdashboard/homepage" className={darkMode ? 'text-white' : 'text-dark'}>
            DriveNow Rentals <i className="bi bi-car-front-fill"></i>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="user-navbar" />
          <Navbar.Collapse id="user-navbar">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/userdashboard/homepage" className={darkMode ? 'text-white' : 'text-dark'}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/userdashboard/viewbooking" className={darkMode ? 'text-white' : 'text-dark'}>
                Booking
              </Nav.Link>
              <Nav.Link as={Link} to="/userdashboard/profile" className={darkMode ? 'text-white' : 'text-dark'}>
                Profile
              </Nav.Link>
            </Nav>

            {userData && (
              <Button variant={darkMode ? 'outline-light' : 'outline-dark'} onClick={handleLogout}>
                Logout
              </Button>
            )}
            <button className="btn btn-outline-secondary m-2" onClick={toggleTheme}>
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Userheader;
