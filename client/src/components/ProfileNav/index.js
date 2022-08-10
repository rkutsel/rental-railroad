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
import OrderTable from "../OrderTable";
import UserProductsList from "../UserProductsList"

function ProfileNav() {
  const { loading, data } = useQuery(QUERY_ME);
  const userProfile = data?.me || {};
  const fullName = `${userProfile.firstName} ${userProfile.lastName}`;

  if (Auth.loggedIn()) {
    return (
      <Container>
        <Row className = "d-flex justify-content-between">
          <Col lg = {4} >
            <Container className = "d-flex flex-column justify-content-center align-items-center">
              <div xs={12} className = "p-10 m-10">
                  <h4>{fullName}</h4>
              </div>
              <div xs={12}>
                  <UserProfileInfo AboutMe = {userProfile.aboutMe}/>
              </div>
            </Container>
          </Col>
          <Col lg = {8}>
            <Container>
              <Tabs defaultActiveKey={2} id="profile-tab-view">
                <Tab eventKey={2} title="My Rentals">
                    <UserProductsList products = {userProfile.rentals}/>
                </Tab>
                <Tab eventKey={3} title="Wishlist">
                    <UserProductsList products = {userProfile.wishlist}/>
                </Tab>
                <Tab eventKey={4} title="Order History">
                    <OrderTable userOrders = {userProfile.orders}/>
                </Tab>
            </Tabs>
          </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProfileNav;
