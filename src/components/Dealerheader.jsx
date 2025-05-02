import axios from 'axios';
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { persistor } from '../redux/store';
import { clearuser } from '../redux/Userslice';
import { useTheme } from '../context/ThemeContext';  // Importing the useTheme hook

function Dealerheader() {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { darkMode, toggleTheme } = useTheme();  // Extracting darkMode state and toggle function

  const handleLogout = async () => {
    try {
      await axios.post(`${baseUrl}/admin/logout`)
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
    <div className='mb-4'>
      <Navbar expand="lg" className={`shadow-sm py-3 ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
        <Container>
          <Navbar.Brand as={Link} to="/" className={darkMode ? 'text-white' : 'text-dark'}>
            DriveNow Rentals <i className="bi bi-car-front-fill"></i>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/dealerdashboard/dealerhome" className={darkMode ? 'text-white fw-medium' : 'text-dark fw-medium'}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/dealerdashboard/addcar" className={darkMode ? 'text-white fw-medium' : 'text-dark fw-medium'}>
                Add Car
              </Nav.Link>
              <Nav.Link as={Link} to="/dealerdashboard/viewcars" className={darkMode ? 'text-white fw-medium' : 'text-dark fw-medium'}>
                Your Cars
              </Nav.Link>
              <Nav.Link as={Link} to="/dealerdashboard/booking" className={darkMode ? 'text-white fw-medium' : 'text-dark fw-medium'}>
                Booking
              </Nav.Link>
              <Nav.Link as={Link} onClick={handleLogout} className={darkMode ? 'text-white fw-medium' : 'text-dark fw-medium'}>
                Logout
              </Nav.Link>
            </Nav>
            <button className="btn btn-outline-secondary m-2" onClick={toggleTheme}>
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Dealerheader;
