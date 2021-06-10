import React, { useState, useEffect } from "react";
import Medusa from "../services/medusa";
import { useSelector, useDispatch } from "react-redux";
import { updateCart, updateCheckoutStep } from "../state/cart";

const InformatioModule = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart?.id) {
      const address = {
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        phone: e.target.phone.value,
        address_1: e.target.address_1.value,
        address_2: e.target.address_2.value,
        country_code: "dk",
        city: e.target.city.value,
        postal_code: e.target.postal_code.value,
      };
      Medusa.cart
        .update(cart.id, {
          shipping_address: address,
          billing_address: address,
          email: e.target.email.value,
        })
        .then(({ data }) => {
          dispatch(updateCart(data.cart));
          dispatch(updateCheckoutStep(2));
        });
    }
  };

  const [customerInfo, setCustomerInfo] = useState({
    address_1: "",
    address_2: "",
    city: "",
    country_code: "",
    first_name: "",
    last_name: "",
    phone: "",
    postal_code: "",
    email: "",
  });

  useEffect(() => {
    if (cart?.shipping_address) {
      const sa = cart?.shipping_address;
      const email = cart.email ? cart.email : null;
      setCustomerInfo({
        address_1: sa.address_1,
        address_2: sa.address_2,
        city: sa.city,
        postal_code: sa.postal_code,
        country_code: sa.country_code,
        phone: sa.phone,
        first_name: sa.first_name,
        last_name: sa.last_name,
        email: email,
      });
    }
  }, [cart]);

  return (
    <div>
      <div className="checkout-header">
        <h2>Your information</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="row-wrapper full-row">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="form-input"
              defaultValue={customerInfo.email}
            />
          </div>
        </div>
        <div className="checkout-header my-2">
          <h2>Delivery Address</h2>
        </div>
        <div>
          <div>
            <span className="cart-note">Shipping to Denmark</span>
          </div>
          <div className="form-row">
            <div className="row-wrapper half-row">
              <input
                className="form-input"
                name="first_name"
                placeholder="First Name"
                defaultValue={customerInfo.first_name}
              />
            </div>
            <div className="row-wrapper half-row">
              <input
                className="form-input"
                name="last_name"
                placeholder="Last Name"
                defaultValue={customerInfo.last_name}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="row-wrapper full-row">
              <input
                className="form-input"
                name="address_1"
                placeholder="Address 1"
                defaultValue={customerInfo.address_1}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="row-wrapper full-row">
              <input
                className="form-input"
                name="address_2"
                placeholder="Address 2"
                defaultValue={customerInfo.address_2}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="row-wrapper half-row">
              <input
                className="form-input"
                name="city"
                placeholder="City"
                defaultValue={customerInfo.city}
              />
            </div>
            <div className="row-wrapper half-row">
              <input
                className="form-input"
                name="postal_code"
                placeholder="Postal Code"
                defaultValue={customerInfo.postal_code}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="row-wrapper full-row">
              <input
                className="form-input"
                name="phone"
                placeholder="Phone Number"
                defaultValue={customerInfo.phone}
              />
            </div>
          </div>
        </div>
        <div className="flex-between checkout-cntrls">
          <span />
          <button className="add-to-cart" type="submit">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default InformatioModule;
