import axios from "axios";
import {
    ordersEndpoint,
    productsEndpoint,
    userLoginEndpoint
} from "../../helper/routes";

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

export const getCartList = () => {
    return new Promise((resolve, reject) => {
        axios.get(ordersEndpoint).then(res => {
            return resolve(res.data.data);
        });
    });
};

export const storeCartItem = (id, qty, price) => {
    return new Promise((resolve, reject) => {
        axios
            .post(ordersEndpoint, {
                product_id: id,
                qty: qty,
                price: price
            })
            .then(res => {
                return resolve(res.data.data);
            });
    });
};

export const updateCartList = arr => {
    return new Promise((resolve, reject) => {
        arr.forEach(obj => {
            axios
                .patch(`${ordersEndpoint}/${obj.id}`, {
                    qty: obj.qty
                })
                .then(response => {
                    return resolve(response.data.message);
                })
                .catch(function(error) {
                    console.log(error);
                });
        });
    });
};

export const deleteCartItem = id => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${ordersEndpoint}/${id}`)
            .then(response => {
                return resolve(response.data.id);
            })
            .catch(function(error) {
                console.log(error);
            });
    });
};

export const login = user => {
    return new Promise((resolve, reject) => {
        axios.post(ordersEndpoint, user).then(res => {
            return resolve(res.data.data);
        });
    });
};

export const storeUserData = (email, password) => {
    return new Promise((resolve, reject) => {
        axios.post(userLoginEndpoint, { email, password }).then(res => {
            return resolve(res.data);
        });
    });
};
