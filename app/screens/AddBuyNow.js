import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Footer,
    Icon,
    Input,
    Item,
    Left,
    Text,
    Thumbnail
} from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";

class AddBuyNow extends Component {
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
                quantity: text.replace(/[^0-9]/g, "")
            });
        }
    };

    render() {
        const { navigation } = this.props;
        const getProductImage = navigation.getParam("productImage", "No Image");
        const getProductName = navigation.getParam("productName", "No Product");
        const getProductPrice = navigation.getParam("productPrice", "No Price");
        return (
            <Container>
                <Content scrollEnabled={false}>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail square source={getProductImage} />
                                <Body>
                                    <Text>{getProductName}</Text>
                                    <Text style={{ color: "#ff5722" }}>
                                        Rp.
                                        {getProductPrice
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
                            marginTop: 17
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
                            <Item style={{ width: 40, height: 38, margin: 3 }}>
                                <Input
                                    style={{ width: 1, textAlign: "center" }}
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
                </Content>
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
                            Rp.{" "}
                            {(this.state.quantity * getProductPrice)
                                .toString()
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                        </Text>
                    </Container>
                    <Button
                        style={styles.buttonCustom}
                        onPress={() =>
                            this.props.navigation.navigate("CheckOutScreen", {
                                productPrice: getProductPrice
                            })
                        }
                    >
                        <Text style={{ textAlign: "center" }}>Buy Now</Text>
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

export default AddBuyNow;
