import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import Jumbotron from "../components/Jumbotron";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");
      const products = cart.map((item) => item._id);

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          idbPromise("cart", "delete", item);
        });
      }

      setTimeout(() => {
        window.location.assign("/");
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <h1
          style={{ fontFamily: "Fredoka One", color: "#fe6b48" }}
          className="display-2 text-center"
        >
          Success!
        </h1>
        <h2
          style={{ fontFamily: "Fredoka One", color: "#03b6fc" }}
          className="display-2 text-center"
        >
          Thank you for renting me!
        </h2>
        <h2
          style={{ fontFamily: "Fredoka One", color: "#c7145e" }}
          className="display-2 text-center"
        >
          Let's see what else is out there to rent...
        </h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
