import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function AddProduct(props) {
  return (
    <span {...props} role="button" tabIndex="0">
      Add product
    </span>
  );
}

export default AddProduct;
