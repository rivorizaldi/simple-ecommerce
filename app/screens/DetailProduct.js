import axios from "axios";
import { Button, Container, Footer, Text } from "native-base";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import Detail from "../components/Detail";

class DetailProduct extends Component {
    constructor() {
        super();
        this.state = {
            productId: "",
            productImage: "",
            productName: "",
            productPrice: 0,
            isLoaded: false
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

    render() {
        const { isLoaded } = this.state;
        return (
            <Container>
                {isLoaded ? (
                    <FlatList
                        data={[
                            {
                                key: this.state.productId,
                                productImage: this.state.productImage,
                                productName: this.state.productName,
                                productPrice: this.state.productPrice
                            }
                        ]}
                        renderItem={({ item }) => (
                            <Detail
                                productImage={`http://192.168.43.204:3333${
                                    item.productImage
                                }`}
                                productName={item.productName}
                                productPrice={item.productPrice
                                    .toString()
                                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                            />
                        )}
                    />
                ) : (
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <ActivityIndicator size="small" color="#ff5722" />
                    </View>
                )}

                <Footer style={styles.footerCustom}>
                    <Button
                        style={styles.buttonCustom}
                        onPress={() =>
                            this.props.navigation.navigate("AddBuyNowAScreen", {
                                productId: this.state.productId
                            })
                        }
                    >
                        <Text>Buy Now</Text>
                    </Button>
                    <Button
                        style={styles.buttonCustom}
                        onPress={() =>
                            this.props.navigation.navigate("AddChartScreen", {
                                productId: this.state.productId
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
