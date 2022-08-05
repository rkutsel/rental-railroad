import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "./index.css";

// import Container from "react-bootstrap/esm/Container";
// import Nav from "react-bootstrap/esm/Nav";
// import Navbar from "react-bootstrap/esm/Navbar";
// import NavDropdown from "react-bootstrap/esm/NavDropdown";

import { Container, Nav, Navbar, NavDropdown, Stack } from "react-bootstrap";

function Navigation() {
  return (
    <Navbar className="Navbar" variant="dark" expand="lg" sticky="top">
      <Container className="ms-auto">
        <Navbar.Brand as={Link} to="/">
              Rental Railroad!
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-start">
            <Stack direction="horizontal" gap={5}>
              <Navbar.Brand className="p-2" as={Link} to="/">
                Home
              </Navbar.Brand>
              <NavDropdown className="p-2" title="Category" id="collapsible-nav-dropdown">
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
              <Navbar.Brand className="p-2" as={Link} to="/login">
                Login
              </Navbar.Brand>
            </Stack>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
