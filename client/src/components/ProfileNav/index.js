import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_FULLNAME } from "../../utils/queries";

import Auth from "../../utils/auth";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function ProfileNav() {
  const { loading, data } = useQuery(QUERY_FULLNAME);
  const fullName =
    `${data?.fullname?.firstName} ${data?.fullname?.lastName}`.toUpperCase();

  if (Auth.loggedIn()) {
    return (
      <Container className="flex-row pt-3">
        <Row>
          <Col xs={3} className="pt-2">
            <h5>{fullName}</h5>
          </Col>
          <Col xs={9}>
            <Nav variant="tabs" defaultActiveKey="aboutme">
              <Nav.Item>
                <Nav.Link eventKey="aboutme">About Me</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="rentals">My Rentals</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="wishlist">Wishlist</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="orderhistory">Order History</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProfileNav;
