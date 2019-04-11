import axios from "axios";
import { Container } from "native-base";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import Detail from "../components/Detail";
import FooterDetail from "../components/FooterDetail";

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
        const baseUrl = "http://192.168.0.9:3333";
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
                                key: this.state.productId.toString(),
                                productImage: this.state.productImage,
                                productName: this.state.productName,
                                productPrice: this.state.productPrice
                            }
                        ]}
                        renderItem={({ item }) => (
                            <Detail
                                productImage={`http://192.168.0.9:3333${
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

                <FooterDetail
                    buyNoW={() =>
                        this.props.navigation.navigate("AddBuyNowAScreen", {
                            productId: this.state.productId
                        })
                    }
                    addCart={() =>
                        this.props.navigation.navigate("AddChartScreen", {
                            productId: this.state.productId
                        })
                    }
                />
            </Container>
        );
    }
}

export default DetailProduct;
