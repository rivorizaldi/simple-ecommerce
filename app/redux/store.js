import { applyMiddleware, compose, createStore } from "redux";
// import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(promise)));

export default store;
