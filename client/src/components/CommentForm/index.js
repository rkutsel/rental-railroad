import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";
import Auth from "../../utils/auth";

// Styles
import "./styles.css";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";

const CommentForm = ({ productId }) => {
  const [commentText, setCommentText] = useState("");

  const [addCommentToProduct] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addCommentToProduct({
        variables: {
          productId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "commentText") {
      setCommentText(value);
    }
  };

  return (
    <>
      {Auth.loggedIn() ? (
        <Form
          onSubmit={handleFormSubmit}
          className="add-comment col-md-8 col-sm-12 d-flex flex-row mt-4 mb-4"
        >
          <Image
            src="https://img.icons8.com/bubbles/100/000000/groups.png"
            width="38"
          />
          <Form.Control
            type="text"
            className="form-control mr-3"
            placeholder="Add your comment..."
            value={commentText}
            name="commentText"
            id="commentText"
            onChange={handleChange}
          />
          <Button className="btn btn-primary" type="submit">
            Comment
          </Button>
        </Form>
      ) : (
        <p className="notLoggedIn px-3">
          You need to be logged in to comment. Please&nbsp;
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </>
  );
};

export default CommentForm;
