import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PRODUCT } from "../utils/queries";

function Detail() {
  const { productId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PRODUCT, {
    // pass URL parameter
    variables: { productId: productId },
  });

  const product = data?.product || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>{product.id}</h1>
    </>
  );
}

export default Detail;
