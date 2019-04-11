import axios from "axios";
import { Button, Container, Footer, Text } from "native-base";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import EmptyCart from "../components/EmptyCart";
import ProductCart from "../components/ProductCart";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartList: [],
            isLoaded: false
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener("didBlur", () => {
            this.setState({
                isLoaded: false
            });
        });

        navigation.addListener("didFocus", () => {
            const baseUrl = "http://192.168.0.9:3333";

            axios
                .get(baseUrl + "/v1/orders")
                .then(response => {
                    const cartList = response.data.data;
                    this.setState({
                        cartList,
                        isLoaded: true
                    });
                })
                .catch(function(error) {
                    console.log(error);
                });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const baseUrl = "http://192.168.0.9:3333";
        if (this.state.cartList !== prevState.cartList) {
            this.state.cartList.forEach(obj => {
                axios
                    .patch(baseUrl + "/v1/orders/" + obj.id, { qty: obj.qty })
                    .then(response => {
                        console.log("sucess");
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            });
        }
    }

    increment = (item, index) => () => {
        this.setState({
            cartList: [
                ...this.state.cartList.slice(0, index),
                Object.assign({}, this.state.cartList[index], {
                    qty: item.qty + 1
                }),
                ...this.state.cartList.slice(index + 1)
            ]
        });
    };

    decrement = (item, index) => () => {
        if (this.state.cartList[index].qty == 1) {
            this.setState({
                cartList: [
                    ...this.state.cartList.slice(0, index),
                    Object.assign({}, this.state.cartList[index], {
                        qty: 1
                    }),
                    ...this.state.cartList.slice(index + 1)
                ]
            });
        } else {
            this.setState({
                cartList: [
                    ...this.state.cartList.slice(0, index),
                    Object.assign({}, this.state.cartList[index], {
                        qty: item.qty - 1
                    }),
                    ...this.state.cartList.slice(index + 1)
                ]
            });
        }
    };

    delete = (item, index) => () => {
        const baseUrl = "http://192.168.0.9:3333";
        axios
            .delete(baseUrl + "/v1/orders/" + item.id)
            .then(() => {
                const filter = this.state.cartList.filter(
                    x => x.id !== item.id
                );
                this.setState({
                    cartList: [...filter]
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    editingText = (item, index) => () => {
        if (this.state.cartList[index].qty < 1 || null) {
            this.setState({
                cartList: [
                    ...this.state.cartList.slice(0, index),
                    Object.assign({}, this.state.cartList[index], {
                        qty: 1
                    }),
                    ...this.state.cartList.slice(index + 1)
                ]
            });
        }
    };

    changeText = (item, index) => text => {
        if (this.state.cartList[index].qty < 1) {
            this.setState({
                cartList: [
                    ...this.state.cartList.slice(0, index),
                    Object.assign({}, this.state.cartList[index], {
                        qty: parseInt(text)
                    }),
                    ...this.state.cartList.slice(index + 1)
                ]
            });
        } else {
            this.setState({
                cartList: [
                    ...this.state.cartList.slice(0, index),
                    Object.assign({}, this.state.cartList[index], {
                        qty: parseInt(text.replace(/[^0-9]/g, ""))
                    }),
                    ...this.state.cartList.slice(index + 1)
                ]
            });
        }
    };

    render() {
        const { isLoaded } = this.state;
        if (isLoaded) {
            return (
                <Container>
                    {this.state.cartList.length ? (
                        <Container>
                            <FlatList
                                keyExtractor={item => item.id.toString()}
                                data={this.state.cartList}
                                renderItem={({ item, index }) => (
                                    <ProductCart
                                        productImage={`http://192.168.0.9:3333${
                                            item.product.image
                                        }`}
                                        productName={item.product.name}
                                        productPrice={item.product.price}
                                        quantity={item.qty}
                                        incrementButton={this.increment(
                                            item,
                                            index
                                        )}
                                        decrementButton={this.decrement(
                                            item,
                                            index
                                        )}
                                        editingText={this.editingText(
                                            item,
                                            index
                                        )}
                                        textChange={this.changeText(
                                            item,
                                            index
                                        )}
                                        deleteList={this.delete(item, index)}
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
                                            .map(x => x.price * x.qty)
                                            .reduce((acc, val) => acc + val)
                                            .toString()
                                            .replace(
                                                /(\d)(?=(\d{3})+(?!\d))/g,
                                                "$1."
                                            )}
                                    </Text>
                                </Container>
                                <Button
                                    style={styles.buttonCustom}
                                    onPress={() => {
                                        this.props.navigation.navigate(
                                            "CheckOutScreen",
                                            {
                                                totalPrice: this.state.cartList
                                                    .map(x => x.price * x.qty)
                                                    .reduce(
                                                        (acc, val) => acc + val
                                                    )
                                            }
                                        );
                                    }}
                                >
                                    <Text>Checkout</Text>
                                </Button>
                            </Footer>
                        </Container>
                    ) : (
                        <EmptyCart />
                    )}
                </Container>
            );
        } else {
            return (
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ActivityIndicator size="small" color="#ff5722" />
                </View>
            );
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
