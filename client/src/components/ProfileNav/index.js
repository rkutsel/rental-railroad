import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import UserProfileInfo from "../UserProfile";

function ProfileNav() {
  const { loading, data } = useQuery(QUERY_ME);
  const userProfile = data?.me || {};
  const fullName = `${userProfile.firstName} ${userProfile.lastName}`;

  if (Auth.loggedIn()) {
    return (
      <Container className="flex-row pt-3">
        <Row>
          <Col xs={3} className="pt-2">
            <h5>{fullName}</h5>
          </Col>
          <Col xs={9}>
            <Tabs defaultActiveKey={1} id="profile-tab-view">
              <Tab eventKey={1} title="About Me">
                 <UserProfileInfo AboutMe = {userProfile.aboutMe}/>
              </Tab>
              <Tab eventKey={2} title="My Rentals">
                My Rentals
              </Tab>
              <Tab eventKey={3} title="Wishlist">
                Wishlist
                {/* <OrderTable /> */}
              </Tab>
              <Tab eventKey={4} title="Order History">
                Order History
                {/* <OrderTable /> */}
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProfileNav;
