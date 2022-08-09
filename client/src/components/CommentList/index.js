import React from "react";

// Styles
import "./styles.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return (
      <>
        <Container>
          <Row>
            <h3>Comments</h3>
          </Row>
        </Container>
        <Container className="mt-1">
          <h5>No comments yet!</h5>
        </Container>
      </>
    );
  }

  return (
    <div className="commentList">
      <Container>
        <Row>
          <h3>Comments</h3>
        </Row>
      </Container>

      <Container className="mt-1">
        <Row>
          <Col className="col-md-12">
            <Card className="card">
              <ListGroup className="list-unstyled">
                {comments &&
                  comments.map((comment) => (
                    <li className="media">
                      <span className="round pt-2">
                        <img
                          src="https://img.icons8.com/bubbles/100/000000/groups.png"
                          className="align-self-start mr-3"
                        />
                      </span>
                      <div className="media-body">
                        <div className="row d-flex">
                          <h6 className="user pt-2">{comment.author}</h6>
                          <div className="ml-auto">
                            <p className="text">{comment.createdAt}</p>
                          </div>
                        </div>
                        <p className="text">{comment.comment}</p>
                      </div>
                    </li>
                  ))}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CommentList;
