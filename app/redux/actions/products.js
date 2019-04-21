import { getProductDetail, getProductList } from "../api/api";
import { FETCH_PRODUCT_DETAIL_DATA, FETCH_PRODUCT_LIST_DATA } from "./constans";

export const fetchProductListData = () => {
    return {
        type: FETCH_PRODUCT_LIST_DATA,
        payload: getProductList()
    };
};

export const fetchDataDetail = id => {
    return {
        type: FETCH_PRODUCT_DETAIL_DATA,
        payload: getProductDetail(id)
    };
};
