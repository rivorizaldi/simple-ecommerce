import { Container } from "native-base";
import React, { Component } from "react";
import { FlatList } from "react-native";
import Product from "../components/Product";

class ProductList extends Component {
    constructor() {
        super();
        this.state = {
            listProduct: [
                {
                    key: "a",
                    name: "Blue T-Shirt",
                    price: 100000,
                    path: require("../assets/img/blue-t-shirt.jpg"),
                    description:
                        "Kaos Polos Bahan Asli Cotton Combed 30s Bandung Ukuran S.M.L"
                },
                {
                    key: "b",
                    name: "Bright Purple T-Shirt",
                    price: 100000,
                    path: require("../assets/img/bright-purple-t-shirt.jpg")
                },
                {
                    key: "c",
                    name: "Cobalt Blue T-Shirt",
                    price: 100000,
                    path: require("../assets/img/cobalt-blue-t-shirt.jpg")
                },
                {
                    key: "d",
                    name: "Green T-Shirt",
                    price: 100000,
                    path: require("../assets/img/green-t-shirt.jpg")
                },
                {
                    key: "e",
                    name: "Grey T-Shirt",
                    price: 100000,
                    path: require("../assets/img/grey-t-shirt.jpg")
                },
                {
                    key: "f",
                    name: "Purple T-Shirt",
                    price: 100000,
                    path: require("../assets/img/purple-t-shirt.jpg")
                },
                {
                    key: "g",
                    name: "Red T-Shirt",
                    price: 100000,
                    path: require("../assets/img/red-t-shirt.jpg")
                },
                {
                    key: "h",
                    name: "Teal T-Shirt",
                    price: 100000,
                    path: require("../assets/img/teal-t-shirt.jpg")
                }
            ]
        };
    }

    render() {
        return (
            <Container>
                <FlatList
                    columnWrapperStyle={{
                        marginTop: 8,
                        marginLeft: 8,
                        alignItems: "space-between"
                    }}
                    horizontal={false}
                    numColumns={2}
                    data={this.state.listProduct}
                    renderItem={({ item }) => (
                        <Product
                            productName={item.name}
                            productPrice={item.price
                                .toString()
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                            productPhoto={item.path}
                            goToProductDetail={() =>
                                this.props.navigation.navigate("Detailscreen", {
                                    productName: item.name,
                                    productImage: item.path,
                                    productPrice: item.price
                                })
                            }
                        />
                    )}
                />
            </Container>
        );
    }
}

export default ProductList;
