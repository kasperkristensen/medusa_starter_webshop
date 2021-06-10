import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/layout";
import Product from "../components/product";
import Medusa from "../services/medusa";

// markup
const IndexPage = () => {
  const [products, setProducts] = useState([]);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    let cartId;
    if (localStorage) {
      cartId = localStorage.getItem("cart_id");
    }

    if (cartId) {
      console.log(cartId);
      Medusa.cart.retrieve(cartId).then(({ data }) => {
        dispatch({ type: "UPDATE_CART", payload: data.cart });
      });
    } else {
      Medusa.cart
        .create()
        .then(({ data }) => {
          console.log(data);
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
      console.log(data.products);
    });
  }, []);

  const handleRemoveFromCart = (lineId) => {
    if (cart && cart.id) {
      Medusa.cart.lineItems.delete(cart.id, lineId).then(({ data }) => {
        dispatch({ type: "UPDATE_CART", payload: data.cart });
      });
    }
  };

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
