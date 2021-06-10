import React, { useEffect, useState } from "react";
import * as queryString from "query-string";
import Medusa from "../../services/medusa";
import { Link } from "gatsby";
import CartItem from "../../components/cartItem";
import { useDispatch } from "react-redux";
import { clearCart } from "../../state/cart";

const Success = ({ location }) => {
  const [order, setOrder] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const { order_id } = queryString.parse(location.search);
    setLoading(true);
    Medusa.orders
      .retrieve(order_id)
      .then(({ data }) => {
        console.log(data);
        setOrder(data.order);
        setLoading(false);
        dispatch(clearCart());
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="checkout-container">
      <Link to="/">
        <h1>brand</h1>
      </Link>
      <div className="wrapper">
        <p>Payment successful – Thank you for your order!</p>
        {order?.items?.map((i) => {
          return <CartItem key={i.id} {...i} />;
        })}
      </div>
    </div>
  );
};

export default Success;
