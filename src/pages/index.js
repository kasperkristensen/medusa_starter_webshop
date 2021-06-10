import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/layout";
import Product from "../components/product";
import Medusa from "../services/medusa";

// markup
const IndexPage = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let cartId;
    if (localStorage) {
      cartId = localStorage.getItem("cart_id");
    }

    if (cartId) {
      Medusa.cart.retrieve(cartId).then(({ data }) => {
        dispatch({ type: "UPDATE_CART", payload: data.cart });
      });
    } else {
      Medusa.cart
        .create()
        .then(({ data }) => {
          dispatch({ type: "UPDATE_CART", payload: data.cart });
          if (localStorage) {
            localStorage.setItem("cart_id", data.cart.id);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }

    Medusa.products.list().then(({ data }) => {
      setProducts(data.products);
    });
  }, []);

  return (
    <Layout>
      {products
        ? products.slice(0, 1).map((p) => {
            return <Product key={p.id} {...p} />;
          })
        : null}
    </Layout>
  );
};

export default IndexPage;
