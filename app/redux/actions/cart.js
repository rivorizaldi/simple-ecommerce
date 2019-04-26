import {
    deleteCartItem,
    getCartList,
    storeCartItem,
    updateCartList
} from "../api/api";
import {
    DECREMENT_CART_DATA,
    DELETE_CART_DATA,
    DELETE_CART_ITEM,
    FETCH_CART_LIST_DATA,
    INCREMENT_CART_DATA,
    STORE_CART_DATA,
    UPDATE_CART_DATA
} from "./constans";

export const fetchCartListData = () => {
    return {
        type: FETCH_CART_LIST_DATA,
        payload: getCartList()
    };
};

export const storeCartData = (id, qty, price) => {
    return {
        type: STORE_CART_DATA,
        payload: storeCartItem(id, qty, price)
    };
};

export const updateCart = arr => {
    return {
        type: UPDATE_CART_DATA,
        payload: updateCartList(arr)
    };
};

export const deleteCart = id => {
    return {
        type: DELETE_CART_DATA,
        payload: deleteCartItem(id)
    };
};

export const deleteCartItems = id => {
    return {
        type: DELETE_CART_ITEM,
        payload: { id }
    };
};

export const incrementCart = id => {
    return {
        type: INCREMENT_CART_DATA,
        payload: { id }
    };
};

export const decrementCart = id => {
    return {
        type: DECREMENT_CART_DATA,
        payload: { id }
    };
};
