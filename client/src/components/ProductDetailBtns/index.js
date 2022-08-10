import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

// Styling
import "./styles.css";
import Button from "react-bootstrap/Button";

const ProductDetailBtns = ({ productId }) => {
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || {};

  const userRentals = user.rentals;

  function checkOwnership(product) {
    return product._id === productId;
  }

  let hasOwnership = userRentals
    ? userRentals.find((product) => checkOwnership(product))
    : [];

  // If user owns the product
  if (hasOwnership) {
    return (
      <>
        <Button className="mx-4">Check In</Button>
        <Button>Remove</Button>
      </>
    );
  }

  // If user does not own the product
  return (
    <>
      <Button className="mx-4">Click to rent</Button>
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
    </>
  );
};

export default ProductDetailBtns;
