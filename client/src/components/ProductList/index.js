import React, { useEffect } from "react";
import ProductItem from "../ProductItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS, QUERY_ME } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";

// Bootstrap components
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  console.log(state);

  const { data: userData } = useQuery(QUERY_ME);
  const userProductIds = userData?.me.rentals.map((rental) => rental._id) || [];

  function isOwner(id) {
    if (userProductIds.includes(id)) {
      return true;
    } else {
      return false;
    }
  }

  console.log(userProductIds);
  // console.log(data._id);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  function returnColor() {
    let num = Math.floor(Math.random() * (3 - 1 + 1) + 1);

    if (num === 3) {
      return "pink";
    } else if (num === 2) {
      return "orange";
    } else {
      return "purple";
    }
  }
  console.log(state.products.length);

  return (
    <>
      {state.products.length ? (
        <div className="cards d-flex justify-content-center">
          <Row xs={1} md={filterProducts().length < 3 ? 2 : 3} className="g-4">
            {filterProducts().map((product) => (
              <Col key={product._id}>
                <ProductItem
                  color={returnColor()}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.pricePerDay}
                  description={product.description}
                  isRented={product.isRented}
                  isOwner={isOwner(product._id)}
                />
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <h3 className="d-flex align-items-center justify-content-center m-5">
          No products to rent!
        </h3>
      )}
    </>
  );
}

export default ProductList;
