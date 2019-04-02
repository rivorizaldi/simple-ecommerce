import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Fab,
    Footer,
    H1,
    H3,
    Icon,
    Left,
    Right,
    Text
} from "native-base";
import React, { Component } from "react";
import { FlatList, Image, ScrollView, StyleSheet } from "react-native";

class ProductList extends Component {
    constructor() {
        super();
        this.state = {
            list: []
        };
    }

    render() {
        const { navigation } = this.props;
        const getProductImage = navigation.getParam("productImage", "No Image");
        const getProductName = navigation.getParam("productName", "No Product");
        const getProductPrice = navigation.getParam("productPrice", "No Price");

        return (
            <Container>
                <FlatList
                    data={[
                        {
                            key: "a",
                            productImage: getProductImage,
                            productName: getProductName,
                            productPrice: getProductPrice
                        }
                    ]}
                    renderItem={({ item }) => (
                        <ScrollView>
                            <Card>
                                <CardItem cardBody>
                                    <Image
                                        source={item.productImage}
                                        style={{
                                            flex: 1,
                                            height: 250
                                        }}
                                        resizeMode="cover"
                                    />
                                    <Fab
                                        style={{
                                            backgroundColor: "white"
                                        }}
                                    >
                                        <Icon
                                            style={{ color: "gray" }}
                                            type="AntDesign"
                                            name="heart"
                                            position="bottomRight"
                                        />
                                    </Fab>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <H1 style={styles.itemName}>
                                            {item.productName}
                                        </H1>
                                    </Left>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <H3 style={styles.itemPrice}>
                                            {item.productPrice}
                                        </H3>
                                    </Left>
                                </CardItem>
                            </Card>
                            <Card>
                                <CardItem>
                                    <Body>
                                        <Text>
                                            5 Courier Avaible. Shipping Charges
                                            Start From Rp. 5000
                                        </Text>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Body style={{ flexDirection: "row" }}>
                                        <Icon type="AntDesign" name="home" />
                                        <Text
                                            style={{
                                                paddingTop: 5,
                                                paddingLeft: 5
                                            }}
                                        >
                                            From Tanggerang City
                                        </Text>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Body style={{ flexDirection: "row" }}>
                                        <Icon
                                            type="FontAwesome5"
                                            name="truck"
                                        />
                                        <Text
                                            style={{
                                                paddingTop: 5,
                                                paddingLeft: 5
                                            }}
                                        >
                                            To Reg Sidoarjo
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card>
                                <CardItem>
                                    <Body>
                                        <Text style={{ fontWeight: "bold" }}>
                                            Product Information
                                        </Text>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Text style={{ marginLeft: 0 }}>
                                            Min. Order
                                        </Text>
                                    </Left>
                                    <Right>
                                        <Text>1</Text>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Text style={{ marginLeft: 0 }}>
                                            Condition
                                        </Text>
                                    </Left>
                                    <Right>
                                        <Text>New</Text>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text style={{ fontWeight: "bold" }}>
                                            Product Description
                                        </Text>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text>
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat.
                                            Duis aute irure dolor in
                                            reprehenderit in voluptate velit
                                            esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat
                                            cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit
                                            anim id est laborum.
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </ScrollView>
                    )}
                />
                <Footer
                    style={{
                        backgroundColor: "white",
                        paddingBottom: 8
                    }}
                >
                    <Button style={styles.buttonCustom}>
                        <Text>Buy Now</Text>
                    </Button>
                    <Button style={styles.buttonCustom}>
                        <Text>Add To Cart</Text>
                    </Button>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    itemPrice: {
        color: "#ff5722",
        fontWeight: "bold"
    },
    itemName: {
        color: "#494d52",
        fontWeight: "bold"
    },
    buttonCustom: {
        flex: 0.5,
        backgroundColor: "#ff5722",
        color: "#ffffff",
        marginLeft: 6,
        marginRight: 6,
        marginTop: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    FabCustom: {
        backgroundColor: "#fff"
    }
});

export default ProductList;
