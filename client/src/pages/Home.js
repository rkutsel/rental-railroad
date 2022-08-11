import React from "react";
import ProductList from "../components/ProductList";
import { useStoreContext } from "../utils/GlobalState";
import { QUERY_CATEGORY } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Container from "react-bootstrap/Container";

// import Cart from "../components/Cart";

const Home = () => {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_CATEGORY, {
    variables: { categoryId: `${currentCategory}` },
  });

  const category = data?.category || [];

  console.log(category);

  if (!currentCategory) {
    return (
      <Container>
        <h1
          style={{ fontFamily: "Fredoka One", color: "#fe6b48" }}
          className="display-2 text-center"
        >
          Take a look at these hot items!
        </h1>
        <ProductList />
      </Container>
    );
  } else {
    return (
      <Container>
        <h1
          style={{ fontFamily: "Fredoka One", color: "#fe6b48" }}
          className="display-2 text-center"
        >
          Explore these {category.name} for rent!
        </h1>
        <ProductList />
      </Container>
    );
  }
};

export default Home;
