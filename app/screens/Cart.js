import { Button, Container, Footer, Text } from "native-base";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import EmptyCart from "../components/EmptyCart";
import ProductCart from "../components/ProductCart";
import { baseUrl } from "../helper/routes";
import {
    decrementCart,
    deleteCart,
    fetchCartListData,
    incrementCart,
    updateCart
} from "../redux/actions/cart";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            deleteItem: "",
            temporaryId: ""
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener("didFocus", () => {
            this.props.fecthCartList();
        });

        navigation.addListener("didBlur", () => {
            this.props.updateCart(this.props.cartList.cartList);
        });
    }

    increment = (item, index) => () => {
        this.props.incrementCart(item.id);
    };

    decrement = (item, index) => () => {
        this.props.decrementCart(item.id);
    };

    toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    delete = (item, index) => () => {
        this.setState({
            isModalVisible: !this.state.isModalVisible,
            deleteItem: item.product.name,
            temporaryId: item.id
        });
    };

    deleteItem = () => {
        this.props.deleteCart(this.state.temporaryId);
        this.setState({
            isModalVisible: !this.state.isModalVisible
        });
        // axios
        //     .delete(`${ordersEndpoint}/${this.state.temporaryId}`)
        //     .then(() => {
        //         this.setState({
        //             isModalVisible: !this.state.isModalVisible
        //         });
        //     })
        //     .then(() => {
        //         const filter = this.state.cartList.filter(
        //             x => x.id !== this.state.temporaryId
        //         );
        //         this.setState({
        //             cartList: [...filter]
        //         });
        //         Toast.show({
        //             text: `${this.state.deleteItem} has deleted from cart`,
        //             buttonText: "Okay"
        //         });
        //     })
        //     .catch(function(error) {
        //         console.log(error);
        //     });
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
        if (this.props.cartList.isPending) {
            return (
                <View style={styles.spinnerCustom}>
                    <ActivityIndicator size="small" color="#ff5722" />
                </View>
            );
        } else {
            return (
                <Container>
                    {this.props.cartList.cartList.length ? (
                        <Container>
                            <FlatList
                                keyExtractor={item => item.id.toString()}
                                data={this.props.cartList.cartList}
                                renderItem={({ item, index }) => (
                                    <ProductCart
                                        productImage={`${baseUrl}${
                                            item.product.image
                                        }`}
                                        productName={item.product.name}
                                        productPrice={item.price
                                            .toString()
                                            .replace(
                                                /(\d)(?=(\d{3})+(?!\d))/g,
                                                "$1."
                                            )}
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
                                        {this.props.cartList.cartList
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
                                            "CheckOutScreen"
                                            // {
                                            //     totalPrice: this.state.cartList
                                            //         .map(x => x.price * x.qty)
                                            //         .reduce((acc, val) => acc + val)
                                            // }
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
    },
    spinnerCustom: {
        flex: 1,
        justifyContent: "center"
    }
});

const mapStateToProps = state => {
    return {
        cartList: state.carts
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fecthCartList: () => dispatch(fetchCartListData()),
        incrementCart: id => dispatch(incrementCart(id)),
        decrementCart: id => dispatch(decrementCart(id)),
        updateCart: arr => dispatch(updateCart(arr)),
        deleteCart: id => dispatch(deleteCart(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);
