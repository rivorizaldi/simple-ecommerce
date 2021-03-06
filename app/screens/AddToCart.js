import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Footer,
    Form,
    Icon,
    Input,
    Item,
    Label,
    Left,
    Text,
    Thumbnail
} from "native-base";
import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import NavigationService from "../../NavigationService";
import { baseUrl } from "../helper/routes";
import { storeCartData } from "../redux/actions/cart";

class AddToCart extends Component {
    constructor() {
        super();
        this.state = {
            quantity: 1,
            totalHarga: 0
        };
    }

    decrementQuantity = () => {
        if (this.state.quantity < 2) {
            this.setState({
                quantity: 1
            });
        } else {
            this.setState({
                quantity: this.state.quantity - 1
            });
        }
    };

    increment = () => {
        this.setState({
            quantity: this.state.quantity + 1
        });
    };

    editingText = () => {
        if (this.state.quantity < 1 || null) {
            this.setState({ quantity: 1 });
        }
    };

    textChange = text => {
        if (this.state.quantity < 1) {
            this.setState({
                quantity: parseInt(text)
            });
        } else {
            this.setState({
                quantity: text.replace(/\D/g, "")
            });
        }
    };

    isEmpty = obj => {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) return false;
        }
        return true;
    };

    render() {
        return (
            <Container>
                {this.props.productCartDetail.isPending && (
                    <View style={styles.spinnerCustom}>
                        <ActivityIndicator size="small" color="#ff5722" />
                    </View>
                )}
                {this.isEmpty(
                    this.props.productCartDetail.productDetail
                ) ? null : (
                    <Content>
                        <Card>
                            <CardItem>
                                <Left>
                                    <Thumbnail
                                        square
                                        source={{
                                            uri: `${baseUrl}${
                                                this.props.productCartDetail
                                                    .productDetail.image
                                            }`
                                        }}
                                    />
                                    <Body>
                                        <Text>
                                            {
                                                this.props.productCartDetail
                                                    .productDetail.name
                                            }
                                        </Text>
                                        <Text style={{ color: "#ff5722" }}>
                                            Rp.
                                            {this.props.productCartDetail.productDetail.price
                                                .toString()
                                                .replace(
                                                    /(\d)(?=(\d{3})+(?!\d))/g,
                                                    "$1."
                                                )}
                                        </Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                        <Container
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginRight: 17,
                                marginLeft: 17,
                                marginTop: 17,
                                height: 50
                            }}
                        >
                            <Text>Quantity</Text>
                            <Container
                                style={{
                                    justifyContent: "flex-end",
                                    flexDirection: "row"
                                }}
                            >
                                <Button
                                    rounded
                                    bordered
                                    success
                                    onPress={this.decrementQuantity}
                                >
                                    <Icon type="AntDesign" name="minus" />
                                </Button>
                                <Item
                                    style={{ width: 40, height: 38, margin: 3 }}
                                >
                                    <Input
                                        style={{
                                            width: 1,
                                            textAlign: "center"
                                        }}
                                        value={this.state.quantity.toString()}
                                        keyboardType="numeric"
                                        onEndEditing={this.editingText}
                                        onChangeText={this.textChange}
                                    />
                                </Item>
                                <Button
                                    rounded
                                    bordered
                                    success
                                    onPress={this.increment}
                                >
                                    <Icon type="AntDesign" name="plus" />
                                </Button>
                            </Container>
                        </Container>
                        <Content>
                            <Form>
                                <Item stackedLabel>
                                    <Label>Note For Seller (Optional)</Label>
                                    <Input />
                                </Item>
                            </Form>
                        </Content>
                    </Content>
                )}

                <Footer style={styles.footerCustom}>
                    <Container
                        style={{
                            marginLeft: 17,
                            textAlignVertical: "center",
                            flex: 0.3
                        }}
                    >
                        <Text>Price Total</Text>
                        <Text style={{ color: "#ff5722" }}>
                            Rp.
                            {(
                                this.state.quantity *
                                this.props.productCartDetail.productDetail.price
                            )
                                .toString()
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                        </Text>
                    </Container>
                    <Button
                        style={styles.buttonCustom}
                        onPress={() => {
                            NavigationService.navigate("CartScreen");
                            this.props.storeCartItem(
                                this.props.productCartDetail.productDetail.id,
                                this.state.quantity,
                                this.props.productCartDetail.productDetail.price
                            );
                        }}
                    >
                        <Text style={{ textAlign: "center" }}>Add To Cart</Text>
                    </Button>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    buttonCustom: {
        flex: 0.7,
        backgroundColor: "#ff5722",
        color: "#ffffff",
        marginLeft: 6,
        marginRight: 17,
        marginTop: 6,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    },
    footerCustom: {
        backgroundColor: "white",
        paddingBottom: 8,
        justifyContent: "space-between"
    },
    spinnerCustom: {
        flex: 1,
        justifyContent: "center"
    }
});

const mapStateToProps = state => {
    return {
        productCartDetail: state.products
    };
};

const mapDispatchToProps = dispatch => {
    return {
        storeCartItem: (id, qty, price) =>
            dispatch(storeCartData(id, qty, price))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddToCart);
