import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import { Link } from "react-router-dom";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { NavDropdown } from "react-bootstrap";
import { UPDATE_CURRENT_CATEGORY } from "../../utils/actions";

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { loading, data } = useQuery(QUERY_CATEGORIES);

  const categories = data?.categories || [];

  const handleClick = (e) => {
    const category = e.target.getAttribute("value");

    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: category,
    });
  };

  if (!categories.length) {
    return (
      <NavDropdown
        className="p-2"
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
      className="p-2 nav-text"
      title="Category"
      id="collapsible-nav-dropdown"
    >
      {categories.map((item) => (
        <NavDropdown.Item
          onClick={handleClick}
          className="nav-text"
          as={Link}
          to="/"
          value={item._id}
          key={item._id}
        >
          {item.name}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
}

export default CategoryMenu;
