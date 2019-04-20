import { combineReducers } from "redux";
import carts from "./carts";
import products from "./products";

const reducers = combineReducers({ products, carts });

export default reducers;
