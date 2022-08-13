import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { ADD_TO_WISHLIST } from "../../utils/mutations";
import { REMOVE_PRODUCT } from "../../utils/mutations";
import { UPDATE_PRODUCT } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { useParams } from "react-router-dom";

// Styling
import "./styles.css";
import Button from "react-bootstrap/Button";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const ProductDetailBtns = ({ productId, isRented }) => {
  const [addToMyWishlist] = useMutation(ADD_TO_WISHLIST);
  const [removeProduct, { error }] = useMutation(REMOVE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  // const { loading, data: me } = useQuery(QUERY_ME);
  const userMe = useQuery(QUERY_ME);
  console.log(userMe?.data?.me);
  const user = userMe?.data?.me || {};

  const userRentals = user.rentals;

  let navigate = useNavigate();

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    console.log(data, "this");
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  });

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
              _id: productId,
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
              _id: productId,
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
          onClick={async () => {
            const removedProductFromUser = await removeProduct({
              variables: {
                productId: productId,
              },
            });

            if (removedProductFromUser) {
              setTimeout(() => {
                navigate("/profile", { replace: true });
              }, 1000);
            }
          }}
        >
          Remove
        </Button>
      </>
    );
  }

  // If user does not own the product
  return (
    <>
      <Button
        onClick={() => {
          getCheckout({
            variables: { products: productId },
          });
        }}
        className="mx-4"
      >
        Click to rent
      </Button>
      <Button
        onClick={async () => {
          const addedProduct = await addToMyWishlist({
            variables: {
              productId: productId,
            },
          });
          if (addedProduct) {
            setTimeout(() => {
              navigate("/profile", { replace: true });
            }, 1000);
          }
        }}
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
