import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { activeCart } from "../state/active";
import { quantity, sum } from "../utils/extensionFunctions";

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  return (
    <button className="cart-btn" onClick={() => dispatch(activeCart())}>
      <span className="mr-1">Cart</span>
      <div>
        <span>
          {cart.items.length > 0 ? cart.items.map(quantity).reduce(sum) : 0}
        </span>
      </div>
    </button>
  );
};

export default ShoppingCart;
