import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

function WishList() {
  return (
    <Container className="pt-3">
      <Card className="flex-row pt-3">
        <Card.Img variant="top" src="../../assets/user_avatar.png" />
        <Card.Body className="flex-row pt-3">
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default WishList;
