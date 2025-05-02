import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTheme } from '../../context/ThemeContext'; // adjust path if needed

function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer className={`border-top mt-5 py-4 ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
      <Container>
        <Row>
          {/* Left Section */}
          <Col md={4} className="mb-3">
            <h5>DriveNow Rentals</h5>
            <p>Reliable cars, affordable prices. Rent your next ride with us.</p>
          </Col>

          {/* Middle Section - Placeholder for future links */}
          <Col md={4} className="mb-3">
            {/* Optional: Add links or quick nav */}
          </Col>

          {/* Right Section */}
          <Col md={4} className="mb-3">
            <h6>Contact Info</h6>
            <p className="mb-1">Email: support@drivenow.com</p>
            <p className="mb-0">Phone: +91 9944567489</p>
          </Col>
        </Row>

        <hr className={`${darkMode ? 'border-light' : 'border-dark'}`} />
        <p className="text-center mb-0">&copy; 2025 DriveNow Rentals. All rights reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer;
