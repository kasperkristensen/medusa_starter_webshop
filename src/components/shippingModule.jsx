import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Medusa from "../services/medusa";
import { updateCart, updateCheckoutStep } from "../state/cart";
import { formatPrice } from "../utils/formatPrice";

const ShippingModule = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [shippingOptions, setShippingOptions] = useState();
  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    Medusa.shippingOptions.listAll().then(({ data }) => {
      setShippingOptions(data.shipping_options);
      setSelectedOption(0);
    });
  }, []);

  const handleSelect = (i) => {
    setSelectedOption(i);
  };

  useEffect(() => {
    if (cart && shippingOptions) {
      Medusa.cart
        .setShippingMethod(cart.id, {
          option_id: shippingOptions[selectedOption].id,
        })
        .then(({ data }) => {
          dispatch(updateCart(data.cart));
        });
    }
  }, [selectedOption]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCheckoutStep(3));
  };

  return (
    <div>
      <div className="checkout-header">
        <h2>Select a shipping method</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          {shippingOptions ? (
            shippingOptions.map((so, i) => {
              return (
                <div key={so.id} className="flex-between shipping-option">
                  <div className="flex-row">
                    <input
                      type="radio"
                      className="radio"
                      value={i}
                      onChange={() => handleSelect(i)}
                      checked={i === selectedOption ? true : false}
                    />
                    <p>{so.name}</p>
                  </div>
                  <span>{formatPrice(so.amount, "EUR")}</span>
                </div>
              );
            })
          ) : (
            <span>loading...</span>
          )}
        </div>
        <div className="flex-between checkout-cntrls">
          <span
            className="step-back"
            onClick={() => dispatch(updateCheckoutStep(1))}
          >
            Back to information
          </span>
          <button type="submit" className="add-to-cart">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingModule;
