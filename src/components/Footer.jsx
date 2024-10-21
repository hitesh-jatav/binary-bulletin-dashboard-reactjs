import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white">
      <Container>
        <Row>
          <Col md={6}>
            <p className="mb-0">
              binarybulletin.com © {new Date().getFullYear()} All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <a
              href="/privacy-policy"
              className="text-white text-decoration-none me-3"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="text-white text-decoration-none"
            >
              Terms of Service
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
