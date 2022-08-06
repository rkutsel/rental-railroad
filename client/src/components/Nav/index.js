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
import Logo from "../../assets/Logo.png";

function Navigation() {
  if (Auth.loggedIn()) {
    return (
      <Navbar className="Navbar" variant="dark" expand="lg" sticky="top">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand className="Brand" as={Link} to="/">
            <Image className="Logo" src={Logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto align-items-start">
              <Stack direction="horizontal" gap={5}>
                <Navbar.Brand className="p-2 d-flex hover" as={Link} to="/">
                  Home
                </Navbar.Brand>
                <NavDropdown
                  className="p-2 hover"
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
                <Navbar.Brand className="p-2 hover" as={Link} to="/profile">
                  Profile
                </Navbar.Brand>
                <Navbar.Brand
                  onClick={() => Auth.logout()}
                  className="p-2 hover"
                  as={Link}
                  to="/"
                >
                  Logout
                </Navbar.Brand>
              </Stack>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <Navbar className="Navbar" variant="dark" expand="lg" sticky="top">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand className="Brand" as={Link} to="/">
            <Image className="Logo" src={Logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto align-items-start">
              <Stack direction="horizontal" gap={5}>
                <Navbar.Brand className="p-2 hover" as={Link} to="/">
                  Home
                </Navbar.Brand>
                <NavDropdown
                  className="p-2 hover"
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
                <Navbar.Brand className="p-2 hover" as={Link} to="/login">
                  Login
                </Navbar.Brand>
              </Stack>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Navigation;
