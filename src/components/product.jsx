import React, { useEffect, useState } from "react";
import Medusa from "../services/medusa";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "../utils/formatPrice";

const Product = (props) => {
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState();

  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const handleAddToCart = (variantId) => {
    if (cart && cart.id) {
      setLoading(true);
      Medusa.cart.lineItems
        .create(cart.id, {
          variant_id: variantId,
          quantity: selectedAmount,
        })
        .then(({ data }) => {
          dispatch({ type: "UPDATE_CART", payload: data.cart });
          setSelectedAmount(1);
          setLoading(false);
        })
        .catch((_e) => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (props) setSelectedVariantId(props.variants[0].id);
  }, [props]);

  const handleOptionChange = (variantId) => {
    setSelectedVariantId(variantId);
  };

  return (
    <div className="product">
      <div className="image">
        <span>IMAGES GO HERE</span>
      </div>
      <div className="product-details">
        <div className="inner">
          <div>
            <span className="category">COLLECTION</span>
          </div>
          <h1>{props.title}</h1>
          <p>{props.description}</p>
          <div className="additionals">
            {props.options?.map((o) => {
              return (
                <div key={o.id}>
                  <span className="option-title">{o.title.toUpperCase()}</span>
                  <div className="option-grid">
                    {props.variants
                      ?.slice(0)
                      .reverse()
                      .map((v) => {
                        return (
                          <span
                            className={`option-select ${
                              v.id === selectedVariantId ? "selected" : ""
                            }`}
                            key={v.id}
                            onClick={() => handleOptionChange(v.id)}
                          >
                            {v.title}
                          </span>
                        );
                      })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="qty-price">
            <div className="qty">
              <button
                className="qty-btn"
                disabled={selectedAmount <= 1 ? true : ""}
                onClick={() => setSelectedAmount(selectedAmount - 1)}
              >
                -
              </button>
              <div className="amount">{selectedAmount}</div>
              <button
                className="qty-btn"
                disabled={
                  selectedVariantId && selectedAmount === 10 ? true : ""
                }
                onClick={() => setSelectedAmount(selectedAmount + 1)}
              >
                +
              </button>
            </div>
            {/* Price is not available from product object */}
            <div className="price">{formatPrice(1950, "EUR")}</div>
          </div>
          <div className="btn-row">
            <button
              className="add-to-cart"
              disabled={loading ? true : ""}
              onClick={() => {
                handleAddToCart(selectedVariantId);
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
