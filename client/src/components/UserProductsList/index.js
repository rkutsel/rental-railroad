import React from "react";
import ProductItem from "../ProductItem";

// Bootstrap components
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function UserProductsList(props) {

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
      { props.products ? (
        <div className="cards d-flex align-items-center justify-content-center m-5">
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
