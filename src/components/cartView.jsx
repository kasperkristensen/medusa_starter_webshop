import React, { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import Medusa from "../services/medusa";
import { activeCart } from "../state/active";
import { quantity, sum } from "../utils/extensionFunctions";
import CartItem from "./cartItem";
import { navigate } from "gatsby";

const CartView = () => {
  const isActive = useSelector((state) => state.active.shoppingCart);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [shippingOptions, setShippingOptions] = useState();
  const [shippingPrice, setShippingPrice] = useState(0);

  useEffect(() => {
    const clickEvent = (e) => {
      if (ref.current !== null && !ref.current.contains(e.target)) {
        dispatch(activeCart());
      }
    };

    if (isActive) {
      window.addEventListener("click", clickEvent);
    }

    return () => {
      window.removeEventListener("click", clickEvent);
    };
  }, [isActive]);

  useEffect(() => {
    Medusa.shippingOptions
      .listAll()
      .then(({ data }) => setShippingOptions(data));
    if (shippingOptions?.shipping_options[0] && cart?.items?.length > 0) {
      setShippingPrice(shippingOptions.shipping_options[0].amount / 100);
    } else {
      setShippingPrice(0);
    }
  }, [cart]);

  const onCheckout = () => {
    navigate("/checkout/payment");
  };

  return cart ? (
    <div ref={ref} className={`cart-view ${isActive ? "active" : ""} px-1`}>
      <div className="flex-between">
        <p>
          ITEMS{" "}
          {cart?.items?.length > 0 ? cart.items.map(quantity).reduce(sum) : 0}
        </p>
        <button className="icon-button" onClick={() => dispatch(activeCart())}>
          <CgClose />
        </button>
      </div>
      <div className="cart-items">
        {cart?.items.map((i) => {
          return <CartItem key={i.id} {...i} />;
        })}
      </div>
      <div className="summery">
        <div className="flex-between">
          <span>SUBTOTAL</span>
          <span>
            {(cart?.total / 100).toFixed(2)}{" "}
            {cart?.region?.currency_code.toUpperCase()}
          </span>
        </div>
        <span className="cart-note">
          No additional taxes or duties will be charged.
        </span>
      </div>
      <div className="summery">
        <div className="flex-between">
          <span>SHIPPING</span>
          <span>
            {shippingPrice.toFixed(2)}{" "}
            {cart?.region?.currency_code.toUpperCase()}
          </span>
        </div>
        <span className="cart-note">
          {shippingOptions?.shipping_options[0]?.name}
        </span>
      </div>
      <div className="flex-between summery">
        <span>TOTAL</span>
        <span>
          {(cart?.total / 100 + shippingPrice).toFixed(2)}{" "}
          {cart?.region?.currency_code.toUpperCase()}
        </span>
      </div>
      <button
        className="add-to-cart"
        onClick={() => onCheckout()}
        disabled={cart?.items?.length < 1 ? true : ""}
      >
        CHECKOUT
      </button>
    </div>
  ) : null;
};

export default CartView;
