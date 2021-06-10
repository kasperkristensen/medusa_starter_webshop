import Medusa from "../services/medusa";

const initialState = {
  cart: { items: [] },
  checkoutStep: 1,
};

export const UPDATE_CART = "UPDATE_CART";
export const CLEAR_CART = "CLEAR_CART";
export const updateCart = (cart) => ({ type: UPDATE_CART, payload: cart });
export const clearCart = () => ({ type: CLEAR_CART });
export const updateItemQuantity = (cartId, itemId, quantity) => {
  return function (dispatch) {
    Medusa.cart.lineItems
      .update(cartId, itemId, {
        quantity: quantity,
      })
      .then(({ data }) => {
        dispatch({ type: "UPDATE_CART", payload: data.cart });
      });
  };
};

export const UPDATE_CHECKOUT_STEP = "UPDATE_CHECKOUT_STEP";
export const updateCheckoutStep = (step) => ({
  type: UPDATE_CHECKOUT_STEP,
  payload: step,
});

const cart = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_CART:
      return { ...state, cart: payload };
    case UPDATE_CHECKOUT_STEP:
      return { ...state, checkoutStep: payload };
    case CLEAR_CART:
      return { cart: { items: [] }, checkoutStep: 1 };
    default:
      return state;
  }
};

export default cart;
