import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Medusa from "../services/medusa";
import { formatPrice } from "../utils/formatPrice";
import CartItem from "./cartItem";

const CartSummery = () => {
  const cart = useSelector((state) => state.cart.cart);
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
      Medusa.cart.create(cartId).then(({ data }) => {
        dispatch({ type: "UPDATE_CART", payload: data.cart });
        if (localStorage) {
          localStorage.setItem("cart_id", data.cart.id);
        }
      });
    }
  }, []);

  return cart ? (
    <div className="cart-summery">
      <div className="checkout-l-inner">
        <div className="cart-items">
          {cart?.items?.map((i) => {
            return <CartItem key={i.id} {...i} />;
          })}
        </div>
        <div className="summery-info">
          <div className="h-divider" />
          <div className="summery">
            <div className="flex-between">
              <span>SUBTOTAL</span>
              <span>
                {formatPrice(
                  cart?.subtotal ? cart.subtotal : 0,
                  cart?.region?.currency_code.toUpperCase()
                )}
              </span>
            </div>
            <span className="cart-note">
              No additional taxes or duties will be charged.
            </span>
          </div>
          <div className="h-divider" />
          <div className="summery">
            <div className="flex-between">
              <span>SHIPPING</span>
              <span>
                {formatPrice(
                  cart?.shipping_total ? cart.shipping_total : 0,
                  cart?.region?.currency_code.toUpperCase()
                )}
              </span>
            </div>
            <span className="cart-note">
              {cart?.shipping_total && cart?.shipping_total > 0
                ? "Standard Shipping"
                : "Select a shipping method"}
            </span>
          </div>
          <div className="h-divider" />
          <div className="flex-between summery">
            <span>TOTAL</span>
            <span>
              {formatPrice(
                cart?.total ? cart.total : 0,
                cart?.region?.currency_code.toUpperCase()
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default CartSummery;
