import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PRODUCT } from "../utils/queries";
import ProductDetailBtns from "../components/ProductDetailBtns";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

// Styling
import "./styles.css";
import Image from "react-bootstrap/esm/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";

function Detail() {
  // Query Product Details
  const { productId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PRODUCT, {
    variables: { productId: productId },
  });
  const product = data?.product || {};

  return (
    <Container className="productInfo">
      <Row className="my-4">
        <Col className="col-md-6">
          <Image
            className="img-fluid"
            src={"/images/" + product.image}
            alt={product.name}
          />
        </Col>
        <Stack className="col-md-6 d-flex justify-content-center align-items-center">
          <h1>{product.name}</h1>

          <h5>
            ${(Math.round(product.pricePerDay * 100) / 100).toFixed(2)} per day
          </h5>

          <p className="text-center">{product.description}</p>

          <Row>
            <Col>
              <ProductDetailBtns
                productId={product._id}
                isRented={product.isRented}
              />
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
