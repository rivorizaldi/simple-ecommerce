import { Button, Container, Footer, Text } from "native-base";
import React, { Component } from "react";
import { FlatList, StyleSheet } from "react-native";
import EmptyCart from "../components/EmptyCart";
import ProductCart from "../components/ProductCart";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartList: []
        };
    }

    componentDidMount() {
        console.log("ini component did mount");
        console.log(this.state.cartList);
        this.addData();
    }

    addData = () => {
        const { navigation } = this.props;
        const willFocus = navigation.addListener("willFocus", () => {
            const { navigation } = this.props;
            const getProductImage = navigation.getParam("productImage", "");
            const getProductName = navigation.getParam("productName", "");
            const getProductPrice = navigation.getParam("productPrice", "");
            const getProductQuantity = navigation.getParam(
                "productQuantity",
                ""
            );
            if (getProductName !== "") {
                const filter = this.state.cartList.filter(
                    x => x.productName === getProductName
                );

                if (filter.length < 1) {
                    this.setState({
                        cartList: [
                            ...this.state.cartList,
                            {
                                productName: getProductName,
                                productImage: getProductImage,
                                productPrice: getProductPrice,
                                quantity: getProductQuantity,
                                key: getProductName
                            }
                        ]
                    });
                } else {
                    const index = this.state.cartList
                        .map(x => x.productName)
                        .indexOf(getProductName);

                    this.setState({
                        cartList: [
                            ...this.state.cartList.slice(0, index),
                            Object.assign({}, this.state.cartList[index], {
                                quantity:
                                    this.state.cartList[index].quantity +
                                    getProductQuantity
                            }),
                            ...this.state.cartList.slice(index + 1)
                        ]
                    });
                }
            }
        });
    };

    increment = (item, index) => () => {
        this.setState({
            cartList: [
                ...this.state.cartList.slice(0, index),
                Object.assign({}, this.state.cartList[index], {
                    quantity: item.quantity + 1
                }),
                ...this.state.cartList.slice(index + 1)
            ]
        });
    };

    decrement = (item, index) => () => {
        if (this.state.cartList[index].quantity == 1) {
            this.setState({
                cartList: [
                    ...this.state.cartList.slice(0, index),
                    Object.assign({}, this.state.cartList[index], {
                        quantity: 1
                    }),
                    ...this.state.cartList.slice(index + 1)
                ]
            });
        } else {
            this.setState({
                cartList: [
                    ...this.state.cartList.slice(0, index),
                    Object.assign({}, this.state.cartList[index], {
                        quantity: item.quantity - 1
                    }),
                    ...this.state.cartList.slice(index + 1)
                ]
            });
        }
    };

    editingText = (item, index) => () => {
        if (this.state.cartList[index].quantity < 1 || null) {
            this.setState({
                cartList: [
                    ...this.state.cartList.slice(0, index),
                    Object.assign({}, this.state.cartList[index], {
                        quantity: 1
                    }),
                    ...this.state.cartList.slice(index + 1)
                ]
            });
        }
    };

    changeText = (item, index) => text => {
        if (this.state.cartList[index].quantity < 1) {
            this.setState({
                cartList: [
                    ...this.state.cartList.slice(0, index),
                    Object.assign({}, this.state.cartList[index], {
                        quantity: parseInt(text)
                    }),
                    ...this.state.cartList.slice(index + 1)
                ]
            });
        } else {
            this.setState({
                cartList: [
                    ...this.state.cartList.slice(0, index),
                    Object.assign({}, this.state.cartList[index], {
                        quantity: parseInt(text.replace(/[^0-9]/g, ""))
                    }),
                    ...this.state.cartList.slice(index + 1)
                ]
            });
        }
    };

    render() {
        if (this.state.cartList.length) {
            console.log(this.state.cartList);
            return (
                <Container>
                    <FlatList
                        data={this.state.cartList}
                        renderItem={({ item, index }) => (
                            <ProductCart
                                productImage={item.productImage}
                                productName={item.productName}
                                productPrice={item.productPrice}
                                quantity={item.quantity}
                                incrementButton={this.increment(item, index)}
                                decrementButton={this.decrement(item, index)}
                                editingText={this.editingText(item, index)}
                                textChange={this.changeText(item, index)}
                                deleteList={() => {
                                    console.log(this.state.cartList);
                                    const filter = this.state.cartList.filter(
                                        x => x.productName !== item.productName
                                    );
                                    this.setState({
                                        cartList: [...filter]
                                    });
                                }}
                            />
                        )}
                    />
                    <Footer style={styles.footerCustom}>
                        <Container
                            style={{
                                flex: 0.3
                            }}
                        >
                            <Text>Total Harga</Text>
                            <Text style={{ color: "#ff5722" }}>
                                Rp.
                                {this.state.cartList
                                    .map(x => x.productPrice * x.quantity)
                                    .reduce((acc, val) => acc + val)
                                    .toString()
                                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                            </Text>
                        </Container>
                        <Button
                            style={styles.buttonCustom}
                            onPress={() => {
                                this.props.navigation.navigate(
                                    "CheckOutScreen",
                                    {
                                        totalPrice: this.state.cartList
                                            .map(
                                                x => x.productPrice * x.quantity
                                            )
                                            .reduce((acc, val) => acc + val)
                                    }
                                );
                            }}
                        >
                            <Text>Checkout</Text>
                        </Button>
                    </Footer>
                </Container>
            );
        } else {
            return <EmptyCart />;
        }
    }
}
const styles = StyleSheet.create({
    buttonCustom: {
        backgroundColor: "#ff5722",
        color: "#ffffff",
        marginLeft: 6,
        marginRight: 6,
        marginTop: 6,
        flex: 0.7,
        alignSelf: "center",
        justifyContent: "center"
    },
    footerCustom: {
        backgroundColor: "white",
        paddingBottom: 8
    }
});

export default Cart;
