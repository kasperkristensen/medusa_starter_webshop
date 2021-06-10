import React from "react";
import { useSelector } from "react-redux";
import ShoppingCart from "./shoppingCart";

const Banner = () => {
  const cart = useSelector((state) => state.cart.cart);
  return (
    <div className="top-bar flex-between">
      <div>
        <a className="logo" href="/">
          brand
        </a>
      </div>
      <div className="flex-row">
        <ShoppingCart />
      </div>
    </div>
  );
};

export default Banner;
