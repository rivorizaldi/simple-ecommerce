import { Button, Container, Footer, Text } from "native-base";
import React, { Component } from "react";
import { FlatList, StyleSheet } from "react-native";
import Details from "../components/Details";

class DetailProduct extends Component {
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
                        <Details
                            productImage={item.productImage}
                            productName={item.productName}
                            productPrice={item.productPrice
                                .toString()
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                        />
                    )}
                />
                <Footer style={styles.footerCustom}>
                    <Button
                        style={styles.buttonCustom}
                        onPress={() =>
                            this.props.navigation.navigate("AddBuyNowAScreen", {
                                productName: getProductName,
                                productImage: getProductImage,
                                productPrice: getProductPrice
                            })
                        }
                    >
                        <Text>Buy Now</Text>
                    </Button>
                    <Button
                        style={styles.buttonCustom}
                        onPress={() =>
                            this.props.navigation.navigate("AddChartScreen", {
                                productName: getProductName,
                                productImage: getProductImage,
                                productPrice: getProductPrice
                            })
                        }
                    >
                        <Text>Add To Cart</Text>
                    </Button>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
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
    footerCustom: {
        backgroundColor: "white",
        paddingBottom: 8
    }
});

export default DetailProduct;
