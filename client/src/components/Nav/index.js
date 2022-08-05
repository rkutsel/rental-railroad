import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

// import Container from "react-bootstrap/esm/Container";
// import Nav from "react-bootstrap/esm/Nav";
// import Navbar from "react-bootstrap/esm/Navbar";
// import NavDropdown from "react-bootstrap/esm/NavDropdown";

import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Navbar.Brand as={Link} to="/">
              Rental Railroad!
            </Navbar.Brand>
            <NavDropdown title="Category" id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/">
                Roman
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/">
                Courtney
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/">
                Logan
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/">
                Raji
              </NavDropdown.Item>
            </NavDropdown>
            <Navbar.Brand>
              <Link to="/login">Login</Link>
            </Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
