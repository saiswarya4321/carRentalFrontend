import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';

function Outerheader() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div>
      <Navbar expand="lg" className={`shadow-sm py-3 ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
        <Container>
          <Navbar.Brand as={Link} to="/">
            DriveNow Rentals <i className="bi bi-car-front-fill"></i>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className={darkMode ? 'text-white fw-medium' : 'text-dark fw-medium'}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/login" className={darkMode ? 'text-white fw-medium' : 'text-dark fw-medium'}>
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup" className={darkMode ? 'text-white fw-medium' : 'text-dark fw-medium'}>
                Sign Up
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

export default Outerheader;
