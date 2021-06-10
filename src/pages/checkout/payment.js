import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { FiChevronRight } from "react-icons/fi";
import InformatioModule from "../../components/informationModule";
import CartSummery from "../../components/cartSummery";
import Medusa from "../../services/medusa";
import { useSelector, useDispatch } from "react-redux";
import ShippingModule from "../../components/shippingModule";
import PaymentModule from "../../components/paymentModule";
import { updateCheckoutStep } from "../../state/cart";
import StepOverview from "../../components/stepOverView";

const Payment = () => {
  const { cart, checkoutStep } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cart) {
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
    }
  }, [cart]);

  return (
    <div className="checkout-layout">
      <div className="checkout-cnt">
        <div className="checkout-right">
          <div className="checkout-branding">
            <Link to="/">
              <h1 className="logo">brand</h1>
            </Link>
          </div>
          <div className="checkout-r-content">
            <div className="breadcrumb-cnt">
              <div
                className={`bc ${
                  checkoutStep === 1 ? "active-breadcrumb" : ""
                }`}
              >
                <span>Information</span>
              </div>
              <div
                className={`bc ${
                  checkoutStep === 2 ? "active-breadcrumb" : ""
                }`}
              >
                <span className="chevron">
                  <FiChevronRight />
                </span>
                <span>Shipping</span>
              </div>
              <div
                className={`bc ${
                  checkoutStep === 3 ? "active-breadcrumb" : ""
                }`}
              >
                <span className="chevron">
                  <FiChevronRight />
                </span>
                <span>Payment</span>
              </div>
            </div>
            <div className="r-mw">
              {checkoutStep === 1 ? (
                <InformatioModule />
              ) : (
                <>
                  <StepOverview />
                  {checkoutStep === 2 ? <ShippingModule /> : <PaymentModule />}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="checkout-left">
          <div className="checkout-l-content">
            <CartSummery {...cart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
