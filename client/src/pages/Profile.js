import React from "react";
import { Container } from "react-bootstrap";
import ProfileNav from "../components/ProfileNav";
import Auth from "../utils/auth";

const Profile = () => {
  if (Auth.loggedIn()) {
  return (
    <div>
      <ProfileNav></ProfileNav>
    </div>
  );
  }
  else {
    return (
      <Container>  
           {window.location.href = "/login"}
      </Container>
    );
  }
};

export default Profile;
