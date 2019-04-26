import { combineReducers } from "redux";
import carts from "./carts";
import products from "./products";
import user from "./user";

const reducers = combineReducers({ products, carts, user });

export default reducers;
