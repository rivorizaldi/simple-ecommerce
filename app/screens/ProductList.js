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
                    name: "MEN HEAVY DUTY FLIGHT BOMBER JACKET",
                    price: 100000,
                    path: require("../assets/img/B-15-MEN'S-HEAVY-DUTY-FLIGHT-BOMBER-JACKET.jpg")
                },
                {
                    key: "b",
                    name: "TOP GUN BACKPACK WITH PATCHES",
                    price: 100000,
                    path: require("../assets/img/TOP-GUN®-B-CKPACK-WITH-PATCHES.jpg")
                },
                {
                    key: "c",
                    name: "TOP UN BOTTLE OPENER STEALTH BELT",
                    price: 100000,
                    path: require("../assets/img/TOP-GUN®-BOTTLE-OPENER-STEALTH-BELT.jpg")
                },
                {
                    key: "d",
                    name: "TOP GUN BEAST MODE CREWNECK",
                    price: 100000,
                    path: require("../assets/img/TOP-GUN®-'BEAST-MODE'-CREWNECK.jpg")
                },
                {
                    key: "e",
                    name: "TOP GUN MEN’S SLIM FIT WOOL PEA COAT",
                    price: 100000,
                    path: require("../assets/img/TOP-GUN®-MEN’S-SLIM-FIT-WOOL-PEA-COAT.png")
                },
                {
                    key: "f",
                    name: "TOP GUN ORIGINAL WHITE JEANS",
                    price: 100000,
                    path: require("../assets/img/TOP-GUN®-ORIGINAL-WHITE-JEANS.jpg")
                },
                {
                    key: "g",
                    name: "TOP GUN STEALTH LOGO CAP",
                    price: 100000,
                    path: require("../assets/img/TOP-GUN®-STEALTH-LOGO-CAP.jpg")
                },
                {
                    key: "h",
                    name: "TEAl T-SHIRT",
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
                                    productPrice: item.price,
                                    key: item.key
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
