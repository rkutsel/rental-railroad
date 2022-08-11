import React from "react";
import ProductItem from "../ProductItem";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

// Bootstrap components
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function UserProductsList(props) {
  const { loading, data } = useQuery(QUERY_ME);
  const userProductIds = data?.me.rentals.map((rental) => rental._id) || [];

  console.log(userProductIds);
  console.log(props.products);

  function isOwner(id) {
    if (userProductIds.includes(id)) {
      return true;
    } else {
      return false;
    }
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
      {props.products ? (
        <div className="cards d-flex">
          <Row xs={1} md={3} className="g-4">
            {props.products.map((product) => (
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
          No products!
        </h3>
      )}
    </>
  );
}

export default UserProductsList;
