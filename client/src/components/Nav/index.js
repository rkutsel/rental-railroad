import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_CURRENT_CATEGORY } from "../../utils/actions";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "./index.css";
import CategoryMenu from "../CategoryMenu";
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
  const [state, dispatch] = useStoreContext();

  const handleClick = (e) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: "",
    });
  };

  if (Auth.loggedIn()) {
    return (
      <Navbar className="Navbar" variant="dark" expand="lg" sticky="top">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand
            onClick={handleClick}
            className="Brand nav-text"
            as={Link}
            to="/"
          >
            <Image className="Logo" src={Logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto align-items-start">
              <Stack direction="horizontal" gap={5}>
                <Navbar.Brand
                  onClick={handleClick}
                  className="p-2 d-flex hover nav-text"
                  as={Link}
                  to="/"
                >
                  Home
                </Navbar.Brand>
                <CategoryMenu />
                <Navbar.Brand
                  className="p-2 d-flex hover nav-text"
                  as={Link}
                  to="/profile"
                >
                  Profile
                </Navbar.Brand>
                <Navbar.Brand
                  onClick={() => Auth.logout()}
                  className="p-2 hover nav-text"
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
          <Navbar.Brand
            onClick={handleClick}
            className="Brand nav-text"
            as={Link}
            to="/"
          >
            <Image className="Logo" src={Logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto align-items-start">
              <Stack direction="horizontal" gap={5}>
                <Navbar.Brand
                  onClick={handleClick}
                  className="p-2 hover nav-text"
                  as={Link}
                  to="/"
                >
                  Home
                </Navbar.Brand>

                <CategoryMenu />
                <Navbar.Brand
                  className="p-2 hover nav-text"
                  as={Link}
                  to="/login"
                >
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
