import React from "react";
import Medusa from "../services/medusa";
import { useSelector, useDispatch } from "react-redux";
import { updateItemQuantity } from "../state/cart";
import { formatPrice } from "../utils/formatPrice";

const CartItem = (props) => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateItemQuantity(cart.id, id, quantity));
  };

  return (
    <div className="cart-item">
      <div className="flex-between">
        <span>{props.variant.product.title.toUpperCase()}</span>
        <strong>{props.description}</strong>
      </div>
      <div className="qty-price">
        <div className="qty">
          <button
            className="qty-btn"
            onClick={() => handleUpdateQuantity(props.id, props.quantity - 1)}
          >
            -
          </button>
          <div className="amount">{props.quantity}</div>
          <button
            className="qty-btn"
            onClick={() => handleUpdateQuantity(props.id, props.quantity + 1)}
            disabled={
              props.quantity >= props.variant.inventory_quantity ? true : ""
            }
          >
            +
          </button>
        </div>
        <span>{formatPrice(props.unit_price * props.quantity, "EUR")}</span>
      </div>
    </div>
  );
};

export default CartItem;
