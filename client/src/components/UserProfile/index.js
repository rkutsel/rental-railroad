import React from "react";
import Image from 'react-bootstrap/Image';
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import avatarImg from "../../assets/user_avatar.png";


function UserProfileInfo(props) {   
        return(
            <Container>
                <Row className="d-flex 
                flex-md-column 
                flex-sm-row 
                justify-content-center    
                align-items-center
                align-content-center
                m-md-5 p-5" >
                    <Col xs ={12}>
                        <Image className="border border-warning" src={avatarImg} roundedCircle width={200} height={200}/>
                     </Col>
                     <Col xs={12}>
                            <p className = "text-center px-3 m-3">{props.AboutMe}</p>
                     </Col>
                </Row>
            </Container>
        );
}

export default UserProfileInfo;