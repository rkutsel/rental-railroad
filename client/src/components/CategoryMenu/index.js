// import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
// import { useStoreContext } from "../../utils/GlobalState";
// import {
//   UPDATE_CATEGORIES,
//   UPDATE_CURRENT_CATEGORY,
// } from "../../utils/actions";
import { Link } from "react-router-dom";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { Nav, NavDropdown } from "react-bootstrap";

function CategoryMenu() {
  // const [state, dispatch] = useStoreContext();

  // const { categories } = state;

  const { loading, data } = useQuery(QUERY_CATEGORIES);

  const categories = data?.categories || [];

  console.log(data);

  if (!categories.length) {
    return (
      <NavDropdown
        className="p-2 hover"
        title="Category"
        id="collapsible-nav-dropdown"
      >
        <NavDropdown.Item as={Link} to="/">
          No Categories :0
        </NavDropdown.Item>
      </NavDropdown>
    );
  }

  return (
    <NavDropdown
      className="p-2 hover nav-text"
      title="Category"
      id="collapsible-nav-dropdown"
    >
      {categories.map((item) => (
        <NavDropdown.Item className="nav-text" as={Link} to="/" key={item._id}>
          {item.name}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
}

export default CategoryMenu;
