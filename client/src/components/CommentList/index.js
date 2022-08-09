import React, { useState } from "react";
import CommentItem from "../CommentItem";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_PRODUCT } from "../../utils/queries";
import { ADD_COMMENT } from "../../utils/mutations";

// Styles
import "./styles.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";

function CommentList() {
  const { loading, data } = useQuery(QUERY_SINGLE_PRODUCT);
  const comments = data?.product.comments || [];

  const [formState, setFormState] = useState({
    commentInput: "",
  });

  const [addCommentToProduct] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = addCommentToProduct({
        variables: { ...formState },
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <div className="commentList">
        <Container>
          <Row>
            <h3>Comments</h3>
          </Row>
        </Container>
        <Form
          onSubmit={handleFormSubmit}
          className="add-comment d-flex flex-row mt-4 mb-4"
        >
          <Image
            src="https://img.icons8.com/bubbles/100/000000/groups.png"
            width="38"
          />
          <Form.Control
            type="text"
            className="form-control mr-3"
            placeholder="Add comment"
            name="commentInput"
            id="commentInput"
            onChange={handleChange}
          />
          <Button className="btn btn-primary" type="submit">
            Comment
          </Button>
        </Form>
        <Container className="mt-1">
          <Row>
            <Col className="col-md-12">
              <Card className="card">
                <ListGroup className="list-unstyled">
                  <CommentItem
                    author={comments.author}
                    comment={comments.comment}
                    createdAt={comments.createdAt}
                  />
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default CommentList;
