import axios from "axios";
import { Button, Container, Footer, Text, Toast } from "native-base";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import EmptyCart from "../components/EmptyCart";
import ProductCart from "../components/ProductCart";
import { baseUrl, ordersEndpoint } from "../helper/routes";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartList: [],
            isLoaded: false,
            isModalVisible: false,
            deleteItem: "",
            temporaryId: ""
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
            axios
                .get(ordersEndpoint)
                .then(response => {
                    const cartList = response.data.data;
                    this.setState({
                        cartList,
                        isLoaded: true
                    });
                    //const responseClone = response.clone();
                })
                .catch(function(error) {
                    console.log(error);
                });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.cartList !== prevState.cartList) {
            this.state.cartList.forEach(obj => {
                axios
                    .patch(`${ordersEndpoint}/${obj.id}`, {
                        qty: obj.qty
                    })
                    .then(response => {})
                    .catch(function(error) {
                        console.log(error);
                    });
            });

            if (prevState.cartList.length === 0) {
                console.log("muncul duluan");
            } else if (prevState.cartList.length > this.state.cartList.length) {
                // this.setState({
                //     isLoaded: true
                // });
            }
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

    toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    delete = (item, index) => () => {
        this.setState({
            isModalVisible: !this.state.isModalVisible,
            deleteItem: this.state.cartList[index].product.name,
            temporaryId: this.state.cartList[index].id
        });
    };

    deleteItem = () => {
        axios
            .delete(`${ordersEndpoint}/${this.state.temporaryId}`)
            .then(() => {
                this.setState({
                    isModalVisible: !this.state.isModalVisible
                });
            })
            .then(() => {
                const filter = this.state.cartList.filter(
                    x => x.id !== this.state.temporaryId
                );

                this.setState({
                    cartList: [...filter]
                });
                Toast.show({
                    text: `${this.state.deleteItem} has deleted from cart`,
                    buttonText: "Okay"
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
                                        productImage={`${baseUrl}${
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
                                    <Text>Price Total</Text>
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
                    <Modal
                        isVisible={this.state.isModalVisible}
                        onBackdropPress={this.toggleModal}
                        onBackButtonPress={this.toggleModal}
                        animationOutTiming={300}
                        animationIn={"fadeIn"}
                        animationOut={"fadeOut"}
                    >
                        <View
                            style={{
                                backgroundColor: "#fff",
                                justifyContent: "center",
                                padding: 8,
                                borderRadius: 5
                            }}
                        >
                            <Text style={{ fontWeight: "bold" }}>
                                Do You Want To Delete {this.state.deleteItem}{" "}
                                From Cart ?
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "flex-end"
                                }}
                            >
                                <Button
                                    transparent
                                    dark
                                    onPress={this.deleteItem}
                                >
                                    <Text>Yes</Text>
                                </Button>

                                <Button
                                    transparent
                                    dark
                                    onPress={this.toggleModal}
                                >
                                    <Text>No</Text>
                                </Button>
                            </View>
                        </View>
                    </Modal>
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
