import {
    FETCH_PRODUCT_DETAIL_DATA,
    FETCH_PRODUCT_LIST_DATA
} from "../actions/constans";

const initialState = {
    isLoggedIn: true,
    isFulfilled: false,
    isRejected: false,
    isPending: false,
    productDetail: {}
};

const products = (state = initialState, action) => {
    switch (action.type) {
        case `${FETCH_PRODUCT_LIST_DATA}_PENDING`:
            return {
                ...state,
                productList: [],
                isPending: true
            };
        case `${FETCH_PRODUCT_LIST_DATA}_FULFILLED`:
            return {
                ...state,
                isFulfilled: true,
                isPending: false,
                productList: action.payload
            };
        case `${FETCH_PRODUCT_LIST_DATA}_REJECTED`:
            return {
                ...state,
                isRejected: true,
                isPending: false,
                error: action.payload
            };
        case `${FETCH_PRODUCT_DETAIL_DATA}_PENDING`:
            return {
                ...state,
                productDetail: {},
                isPending: true
            };
        case `${FETCH_PRODUCT_DETAIL_DATA}_FULFILLED`:
            return {
                ...state,
                isFulfilled: true,
                isPending: false,
                productDetail: action.payload
            };
        case `${FETCH_PRODUCT_DETAIL_DATA}_REJECTED`:
            return {
                ...state,
                isRejected: true,
                isPending: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default products;
