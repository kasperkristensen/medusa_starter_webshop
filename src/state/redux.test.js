import { ACTIVE_SHOPPING_CART, activeCart } from "./active";
import cart, {
  UPDATE_CART,
  CLEAR_CART,
  updateCart,
  clearCart,
  updateCheckoutStep,
  UPDATE_CHECKOUT_STEP,
} from "./cart";
import active from "./active";

//active.js tests
describe("active action creator", () => {
  it("should create an action that activates the cart view", () => {
    const expectedAction = {
      type: ACTIVE_SHOPPING_CART,
    };
    expect(activeCart()).toEqual(expectedAction);
  });
});

describe("active reducer", () => {
  it("should return the default state", () => {
    expect(active(undefined, {})).toEqual({
      shoppingCart: false,
    });
  });

  it("should change state to true", () => {
    expect(active({ shoppingCart: false }, activeCart())).toEqual({
      shoppingCart: true,
    });
  });

  it("should change state to false", () => {
    expect(active({ shoppingCart: true }, activeCart())).toEqual({
      shoppingCart: false,
    });
  });
});

//cart.js tests
const initialCartState = {
  cart: { items: [] },
  checkoutStep: 1,
};

describe("cart action creators", () => {
  it("should create an action that sets the checkoutStep to 1", () => {
    const expectedAction = {
      type: UPDATE_CHECKOUT_STEP,
      payload: 1,
    };
    expect(updateCheckoutStep(1)).toEqual(expectedAction);
  });

  it("should create an action that updates the cart", () => {
    const expectedAction = {
      type: UPDATE_CART,
      payload: { id: 1, items: [] },
    };
    expect(updateCart({ id: 1, items: [] })).toEqual(expectedAction);
  });

  it("should create an action that clears the cart state", () => {
    const expectedAction = {
      type: CLEAR_CART,
    };
    expect(clearCart()).toEqual(expectedAction);
  });
});

describe("cart reducer", () => {
  it("should return the default state", () => {
    expect(cart(undefined, {})).toEqual({
      cart: { items: [] },
      checkoutStep: 1,
    });
  });

  it("should update the checkout step", () => {
    expect(cart(initialCartState, updateCheckoutStep(2))).toEqual({
      cart: { items: [] },
      checkoutStep: 2,
    });
  });

  it("should update the cart", () => {
    const mock_cart = { id: 1, items: [] };
    expect(cart(initialCartState, updateCart(mock_cart))).toEqual({
      cart: { id: 1, items: [] },
      checkoutStep: 1,
    });
  });

  it("should reset the cart and checkout step", () => {
    const mock_cart_state = {
      cart: { id: 1, items: [{ id: "item_1" }] },
      checkoutStep: 2,
    };
    expect(cart(mock_cart_state, clearCart())).toEqual({
      cart: { items: [] },
      checkoutStep: 1,
    });
  });
});
