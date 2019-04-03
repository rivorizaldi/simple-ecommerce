import {
    Button,
    Card,
    CardItem,
    Container,
    Footer,
    Icon,
    Input,
    Item,
    Left,
    Right,
    Text,
    Thumbnail,
    Body
} from "native-base";
import EmptyCart from "../components/EmptyCart";
import React, { Component } from "react";
import { FlatList, StyleSheet } from "react-native";

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cartList: []
        };
    }

    render() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("willFocus", () => {
            const { navigation } = this.props;
            const getProductImage = navigation.getParam("productImage", "");
            const getProductName = navigation.getParam("productName", "");
            const getProductPrice = navigation.getParam("productPrice", "");

            const getProductQuantity = navigation.getParam(
                "productQuantity",
                ""
            );

            if (getProductName !== "") {
                this.setState({
                    cartList: [
                        ...this.state.cartList,
                        {
                            productName: getProductName,
                            productImage: getProductImage,
                            productPrice: getProductPrice,
                            quantity: getProductQuantity
                        }
                    ]
                });
            }
        });
        if (this.state.cartList.length) {
            return (
                <Container>
                    <FlatList
                        data={this.state.cartList}
                        renderItem={({ item }) => (
                            <Card>
                                <CardItem>
                                    <Left>
                                        <Thumbnail
                                            square
                                            source={item.productImage}
                                        />
                                        <Body>
                                            <Text>{item.productName}</Text>
                                            <Text style={{ color: "#ff5722" }}>
                                                Rp. {item.productPrice}
                                            </Text>
                                        </Body>
                                    </Left>
                                    <Right style={{ flexDirection: "row" }}>
                                        <Button
                                            small
                                            rounded
                                            bordered
                                            success
                                            onPress={() => {
                                                item.quantity - 1;
                                            }}
                                        >
                                            <Icon
                                                type="AntDesign"
                                                name="minus"
                                            />
                                        </Button>
                                        <Item
                                            style={{
                                                width: 40,
                                                height: 38,
                                                margin: 3
                                            }}
                                        >
                                            <Input
                                                style={{
                                                    width: 1,
                                                    textAlign: "center"
                                                }}
                                                value={item.quantity.toString()}
                                                keyboardType="numeric"
                                            />
                                        </Item>
                                        <Button
                                            small
                                            rounded
                                            bordered
                                            success
                                            onPress={() => {
                                                item.quantity + 1;
                                            }}
                                        >
                                            <Icon
                                                type="AntDesign"
                                                name="plus"
                                            />
                                        </Button>
                                    </Right>
                                </CardItem>
                            </Card>
                        )}
                    />
                    <Footer style={styles.footerCustom}>
                        <Container
                            style={{
                                flex: 0.3
                            }}
                        >
                            <Text>Total Harga</Text>
                            <Text style={{ color: "#ff5722" }}>Rp. {}</Text>
                        </Container>
                        <Button style={styles.buttonCustom}>
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
