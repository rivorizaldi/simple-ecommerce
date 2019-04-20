import * as actionTypes from "../actions/actionTypes";

const initialState = {
    productList: [],
    isLoaded: false,
    productDetail: {}
};

const products = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOWPRODUCTLIST:
            return {
                ...state,
                productList: action.payloads,
                isLoaded: true
            };
        // case "Fetching":
        //     return {
        //         ...state
        //     };
    }

    return state;
};

export default products;
