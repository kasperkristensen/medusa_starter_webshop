import React from "react";
import ShoppingCart from "./shoppingCart";

const Banner = () => {
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
