import {
    DECREMENT_CART_DATA,
    DELETE_CART_ITEM,
    // DELETE_CART_DATA,
    FETCH_CART_LIST_DATA,
    INCREMENT_CART_DATA,
    STORE_CART_DATA
} from "../actions/constans";

const initialState = {
    cartList: [],
    isFulfilled: false,
    isRejected: false,
    isPending: false,
    error: ""
};

const carts = (state = initialState, action) => {
    switch (action.type) {
        case `${FETCH_CART_LIST_DATA}_PENDING`:
            return {
                ...state,
                cartList: [],
                isPending: true
            };
        case `${FETCH_CART_LIST_DATA}_FULFILLED`:
            return {
                ...state,
                isFulfilled: true,
                isPending: false,
                cartList: [...state.cartList, ...action.payload]
            };
        case `${FETCH_CART_LIST_DATA}_REJECTED`:
            return {
                ...state,
                isRejected: true,
                isPending: false,
                error: action.payload
            };
        case `${STORE_CART_DATA}_PENDING`:
            return {
                ...state,
                cartList: [],
                isPending: true
            };
        case `${STORE_CART_DATA}_FULFILLED`:
            return {
                ...state,
                isFulfilled: true,
                isPending: false
            };
        case DELETE_CART_ITEM:
            return {
                ...state,
                cartList: state.cartList.filter(
                    item => item.id !== action.payload.id
                )
            };
        case INCREMENT_CART_DATA:
            return {
                ...state,
                cartList: state.cartList.map(item =>
                    item.id === action.payload.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                )
            };
        case DECREMENT_CART_DATA:
            return {
                ...state,
                cartList: state.cartList.map(item =>
                    item.id === action.payload.id
                        ? { ...item, qty: item.qty == 1 ? 1 : item.qty - 1 }
                        : item
                )
            };

        default:
            return state;
    }
};

export default carts;
