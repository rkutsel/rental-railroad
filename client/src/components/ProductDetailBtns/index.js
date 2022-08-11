import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { ADD_TO_WISHLIST } from "../../utils/mutations";
import { REMOVE_PRODUCT } from "../../utils/mutations";
import { UPDATE_PRODUCT } from "../../utils/mutations";
import Auth from "../../utils/auth";

// Styling
import "./styles.css";
import Button from "react-bootstrap/Button";

const ProductDetailBtns = ({ productId, isRented }) => {
  const [addToMyWishlist] = useMutation(ADD_TO_WISHLIST);
  const [removeProduct, { error }] = useMutation(REMOVE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || {};

  const userRentals = user.rentals;

  // Checking if user owns product to render the correct btn components
  function checkOwnership(product) {
    return product._id === productId;
  }

  let hasOwnership = userRentals
    ? userRentals.find((product) => checkOwnership(product))
    : [];

  // Conditional checked in button based on product rented status
  let checkedInBtn;
  if (isRented) {
    checkedInBtn = (
      <Button
        onClick={() =>
          updateProduct({
            variables: {
              productId: productId,
              isRented: false,
            },
          })
        }
        className="mx-4"
      >
        Check In
      </Button>
    );
  } else {
    checkedInBtn = (
      <Button
        onClick={() =>
          updateProduct({
            variables: {
              productId: productId,
              isRented: true,
            },
          })
        }
        className="mx-4"
      >
        Check Out
      </Button>
    );
  }

  // If user owns the product
  if (Auth.loggedIn() && hasOwnership) {
    return (
      <>
        {checkedInBtn}
        <Button
          onClick={() =>
            removeProduct({
              variables: {
                productId: productId,
              },
            })
          }
        >
          Remove
        </Button>
      </>
    );
  }

  // If user does not own the product
  return (
    <>
      <Button className="mx-4">Click to rent</Button>
      <Button
        onClick={() =>
          addToMyWishlist({
            variables: {
              productId: productId,
            },
          })
        }
      >
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
