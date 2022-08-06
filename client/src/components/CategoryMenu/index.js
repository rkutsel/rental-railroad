import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { Link } from "react-router-dom";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { Nav, NavDropdown } from "react-bootstrap";

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  // return (
  //   <div>
  //     <h2>Choose a Category:</h2>
  //     {categories.map((item) => (
  //       <button
  //         key={item._id}
  //         onClick={() => {
  //           handleClick(item._id);
  //         }}
  //       >
  //         {item.name}
  //       </button>
  //     ))}
  //   </div>
  // );

  return (
    <NavDropdown
      className="p-2 hover"
      title="Category"
      id="collapsible-nav-dropdown"
    >
      {categories.map((item) => (
        <NavDropdown.Item as={Link} to="/" key={item._id}>
          {item.name}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
}

export default CategoryMenu;
