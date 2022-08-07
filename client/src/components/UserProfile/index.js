import React from "react";
import Image from 'react-bootstrap/Image';
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import avatarImg from "../../assets/user_avatar.png";



function UserProfileInfo() {

    const { loading, data } = useQuery(QUERY_USER);
    
    const userprofile = data?.user || {};

    if (userprofile) {
        return(
            <Container my-3>
                <Row className="d-flex 
                flex-lg-row 
                flex-md-column 
                flex-sm-column 
                justify-content-lg-center 
                justify-content-md-center
                justify-content-sm-center 
                align-items-lg-center
                align-items-md-center
                align-items-sm-center
                align-content-sm-center
                m-5 p-5" >
                    <Col xs={12} md={6} lg={3} >
                        <Image className="border border-warning p-2" src={avatarImg} roundedCircle width={200} height={200} />
                     </Col>
                     <Col xs={12} md={6} lg={9}>
                            <p className = "text-center px-3 m-3">{userprofile.aboutMe}</p>
                     </Col>
                </Row>
            </Container>
        );

    } 
}

export default UserProfileInfo;