import React from "react";
import ProductList from "../components/ProductList";
import { useStoreContext } from "../utils/GlobalState";
import { QUERY_CATEGORY } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Container from "react-bootstrap/Container";

// import Cart from "../components/Cart";

const Home = () => {
  const [state] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_CATEGORY, {
    variables: { categoryId: `${currentCategory}` },
  });

  const category = data?.category || [];

  console.log(category);

  if (!currentCategory) {
    return (
      <Container>
        <h1 className="display-2 text-center">Looking for Something?</h1>
        <ProductList />
      </Container>
    );
  } else {
    return (
      <Container>
        <h1 className="display-2 text-center">Looking for {category.name}?</h1>
        <ProductList />
      </Container>
    );
  }
};

export default Home;
