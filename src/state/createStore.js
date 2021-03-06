import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from ".";

// preloadedState will be passed in by the plugin
export default (preloadedState) => {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
};
