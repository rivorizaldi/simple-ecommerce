import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(promise, thunk, logger))
);

export default store;
