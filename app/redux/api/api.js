import axios from "axios";
import { productsEndpoint } from "../../helper/routes";

export const getProductList = () => {
    return new Promise((resolve, reject) => {
        axios.get(productsEndpoint).then(res => {
            return resolve(res.data.data);
        });
    });
};

export const getProductDetail = id => {
    return new Promise((resolve, reject) => {
        axios.get(`${productsEndpoint}/${id}`).then(res => {
            return resolve(res.data.data);
        });
    });
};
