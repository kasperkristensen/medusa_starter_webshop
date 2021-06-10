import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Medusa from "../services/medusa";
import { useDispatch, useSelector } from "react-redux";
import { updateCheckoutStep } from "../state/cart";
import { navigate } from "gatsby-link";

const PaymentModule = () => {
  const stripe_key = process.env.GATSBY_STRIPE_KEY || null;
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");
    const [cartId, setCartId] = useState();

    useEffect(() => {
      if (cart?.id) {
        Medusa.cart.createPaymentSessions(cart.id).then(({ data }) => {
          setClientSecret(data.cart.payment_session.data.client_secret);
          setCartId(data.cart.id);
        });
      }
    }, []);

    const handleChange = async (event) => {
      setDisabled(event.empty);
      setError(event.error ? event.error.message : "");
    };

    const handleSubmit = async (ev) => {
      ev.preventDefault();
      setProcessing(true);
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        setError(null);
        setProcessing(false);
        setSucceeded(true);
        Medusa.cart
          .completeCart(cartId)
          .then(({ data }) => {
            navigate(`/checkout/success?order_id=${data.id}`);
          })
          .catch((e) => console.log(e));
      }
    };
    return (
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement id="card-element" onChange={handleChange} />
        <div className="flex-between checkout-cntrls">
          <span
            className="step-back"
            onClick={() => dispatch(updateCheckoutStep(2))}
          >
            Back to shipping method
          </span>
          <button
            disabled={processing || disabled || succeeded}
            id="submit"
            className="add-to-cart"
          >
            <span id="button-text">
              {processing ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Confirm"
              )}
            </span>
          </button>
        </div>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment succeeded, see the result in your
          <a href={`https://dashboard.stripe.com/test/payments`}>
            {" "}
            Stripe dashboard.
          </a>{" "}
          Refresh the page to pay again.
        </p>
      </form>
    );
  };

  const stripePromise = loadStripe(stripe_key);

  return (
    <Elements stripe={stripePromise}>
      <div className="checkout-header">
        <h2>Payment</h2>
      </div>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentModule;
