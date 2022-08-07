import React from "react";
import Auth from "../../utils/auth";
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";

function UserProfileInfo(props) {
    if (Auth.loggedIn()) {
        return(
            <Container>
                <Row className="justify-content-center">
                     <Image className="Logo" src={Logo} roundedCircle/>
                     <Card body>${props.aboutMe}</Card>;
                </Row>
            </Container>
        );

    } 
}

export default UserProfileInfo;