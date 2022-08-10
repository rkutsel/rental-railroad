import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PRODUCT } from "../utils/queries";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

// Styling
import "./styles.css";
import Image from "react-bootstrap/esm/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";

function Detail() {
  const { productId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PRODUCT, {
    variables: { productId: productId },
  });

  const product = data?.product || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="productInfo">
      <Row className="my-4">
        <Col className="col-md-6">
          <Image src={"/images/" + product.image} alt={product.name} />
        </Col>
        <Stack className="col-md-6 d-flex justify-content-center align-items-center">
          <h1>{product.name}</h1>

          <h5>
            ${(Math.round(product.pricePerDay * 100) / 100).toFixed(2)} per day
          </h5>

          <p className="text-center">{product.description}</p>

          <Row>
            <Col>
              <Button className="mx-4" id="rentBtn">
                Click to rent
              </Button>
              <Button>
                Add to wishlist&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
              </Button>
            </Col>
          </Row>
        </Stack>
      </Row>
      <Row>
        <Col>
          <CommentList comments={product.comments} />
          <CommentForm productId={product._id} />
        </Col>
      </Row>
    </Container>
  );
}

export default Detail;
