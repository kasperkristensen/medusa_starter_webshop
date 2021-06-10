import { combineReducers } from "redux";
import cart from "./cart";
import active from "./active";

export default combineReducers({ cart, active });
