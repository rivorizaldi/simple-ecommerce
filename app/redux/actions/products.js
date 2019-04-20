import axios from "axios";
import { productsEndpoint } from "../../helper/routes";
import * as actionTypes from "./actionTypes";

export const showProduct = () => {
    return dispatch => {
        axios
            .get(productsEndpoint)
            .then(res => {
                dispatch({
                    type: actionTypes.SHOWPRODUCTLIST,
                    payloads: res.data.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
};

export const showDetail = id => {
    return dispatch => {
        axios
            .get(`productsEndpoint/${id}`)
            .then(res => {
                dispatch({
                    type: actionTypes.SHOWPRODUCTDETAIL,
                    payloads: res.data.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
};
