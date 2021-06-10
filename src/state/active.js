const initialState = {
  shoppingCart: false,
};

export const ACTIVE_SHOPPING_CART = "ACTIVE_SHOPPING_CART";
export const activeCart = () => ({ type: ACTIVE_SHOPPING_CART });

const active = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case ACTIVE_SHOPPING_CART:
      return { shoppingCart: !state.shoppingCart };
    default:
      return state;
  }
};

export default active;
