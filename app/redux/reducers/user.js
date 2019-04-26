import { STORE_USER_DATA } from "../actions/constans";

const initialState = {
    isLoggedIn: false,
    isFulfilled: false,
    isRejected: false,
    isPending: false,
    userData: {},
    token: {}
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case `${STORE_USER_DATA}_PENDING`:
            return {
                ...state,
                isPending: true
            };
        case `${STORE_USER_DATA}_FULFILLED`:
            return {
                ...state,
                isFulfilled: true,
                isPending: false,
                isLoggedIn: true,
                userData: action.payload.user,
                token: action.payload.access_token
            };
        case `${STORE_USER_DATA}_REJECTED`:
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

export default user;
