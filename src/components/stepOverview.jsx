import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCheckoutStep } from "../state/cart";

const StepOverview = () => {
  const { cart, checkoutStep } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <div className="checkout-header">
          <h2>Details</h2>
        </div>
        <div className="done-steps">
          {cart?.shipping_address ? (
            <>
              <div className="checkout-step">
                <span className="detail">Contact </span>
                <div className="step-info">
                  {cart.shipping_address.first_name}{" "}
                  {cart.shipping_address.last_name}
                </div>
                <span
                  className="step-back"
                  onClick={() => dispatch(updateCheckoutStep(1))}
                >
                  Edit
                </span>
              </div>
              <div className="checkout-step">
                <span className="detail">Address</span>
                <div className="step-info">
                  {cart.shipping_address.address_1},{" "}
                  {cart.shipping_address.city}
                </div>
                <span
                  className="step-back"
                  onClick={() => dispatch(updateCheckoutStep(1))}
                >
                  Edit
                </span>
              </div>
            </>
          ) : null}
          {cart?.shipping_methods[0] && checkoutStep !== 2 ? (
            <div className="checkout-step">
              <span className="detail">Shipping</span>
              <div className="step-info">
                {cart.shipping_methods[0].shipping_option.name}
              </div>
              <span
                className="step-back"
                onClick={() => dispatch(updateCheckoutStep(2))}
              >
                Edit
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default StepOverview;
