import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Navigation() {
  return (
    <Navbar fixed="top" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/">Rental Railroad!</Link>
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav"> */}
        <Nav className="me-auto">
          <NavDropdown title="Category" id="collapsible-nav-dropdown">
            <NavDropdown.Item>Roman</NavDropdown.Item>
            <NavDropdown.Item>Courtney</NavDropdown.Item>
            <NavDropdown.Item>Logan</NavDropdown.Item>
            <NavDropdown.Item>Raji</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Navbar.Brand>
          <Link to="/login">Login</Link>
        </Navbar.Brand>
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
}

export default Navigation;
