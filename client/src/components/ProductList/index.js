import React, { useEffect } from "react";
import ProductItem from "../ProductItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";

// Bootstrap components
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  console.log(state);
  
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

  return (
    <>
      {state.products.length ? (
        <div className="cards d-flex">
          <Row xs={1} md={3} className="g-4">
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
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default ProductList;
