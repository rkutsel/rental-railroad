import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "./index.css";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Stack,
  Image,
} from "react-bootstrap";
import Logo from "../../assets/TL2.png";

function Navigation() {
  return (
    <Navbar className="Navbar" variant="dark" expand="lg" sticky="top">
      <Container className="ms-auto">
        <Navbar.Brand as={Link} to="/">
          <Image className="Logo" src={Logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-start">
            <Stack direction="horizontal" gap={5}>
              <Navbar.Brand className="p-2" as={Link} to="/">
                Home
              </Navbar.Brand>
              <NavDropdown
                className="p-2"
                title="Category"
                id="collapsible-nav-dropdown"
              >
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
