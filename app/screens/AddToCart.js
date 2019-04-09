import axios from "axios";
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
import NavigationService from "../../NavigationService";

class AddToCart extends Component {
    constructor() {
        super();
        this.state = {
            quantity: 1,
            totalHarga: 0,
            isLoaded: false,
            productId: "",
            productImage: "",
            productName: "",
            productPrice: 0
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        const baseUrl = "http://192.168.43.204:3333";
        const getProductId = navigation.getParam("productId", "");

        axios
            .get(`${baseUrl}/v1/products/${getProductId}`)
            .then(response => {
                const detailProduct = response.data.data;
                console.log(detailProduct);
                this.setState({
                    productId: detailProduct.id,
                    productImage: detailProduct.image,
                    productName: detailProduct.name,
                    productPrice: detailProduct.price,
                    isLoaded: true
                });
            })
            .catch(function(error) {
                console.log(error);
            });
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
                quantity: text.replace(/[^0-9]/g, "")
            });
        }
    };

    render() {
        const { isLoaded } = this.state;
        return (
            <Container>
                {isLoaded ? (
                    <Content>
                        <Card>
                            <CardItem>
                                <Left>
                                    <Thumbnail
                                        square
                                        source={{
                                            uri: `http://192.168.43.204:3333${
                                                this.state.productImage
                                            }`
                                        }}
                                    />
                                    <Body>
                                        <Text>{this.state.productName}</Text>
                                        <Text style={{ color: "#ff5722" }}>
                                            Rp.
                                            {this.state.productPrice
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
                            <Text>Jumlah</Text>
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
                ) : (
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <ActivityIndicator size="small" color="#ff5722" />
                    </View>
                )}

                <Footer style={styles.footerCustom}>
                    <Container
                        style={{
                            marginLeft: 17,
                            textAlignVertical: "center",
                            flex: 0.3
                        }}
                    >
                        <Text>Total Harga</Text>
                        <Text style={{ color: "#ff5722" }}>
                            Rp.
                            {(this.state.quantity * this.state.productPrice)
                                .toString()
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                        </Text>
                    </Container>
                    <Button
                        style={styles.buttonCustom}
                        onPress={() => {
                            const baseUrl = "http://192.168.43.204:3333";
                            axios
                                .post(`${baseUrl}/v1/orders`, {
                                    product_id: this.state.productId,
                                    qty: this.state.quantity,
                                    price: this.state.productPrice
                                })
                                .then(res => {
                                    NavigationService.navigate("CartScreen");
                                });
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
    }
});

export default AddToCart;
