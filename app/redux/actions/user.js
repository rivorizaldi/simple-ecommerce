import { storeUserData } from "../api/api";
import { STORE_USER_DATA } from "./constans";

// export const fetchUseData = id => {
//     return {
//         type: FETCH_USER_DATA,
//         payload: getProductList(id)
//     };
// };

export const storesUserData = (email, password) => {
    return {
        type: STORE_USER_DATA,
        payload: storeUserData(email, password)
    };
};
