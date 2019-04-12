import axios from "axios";
import { Container, Text } from "native-base";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import Detail from "../components/Detail";
import FooterDetail from "../components/FooterDetail";
import { baseUrl, productsEndpoint } from "../helper/routes";

class DetailProduct extends Component {
    constructor() {
        super();
        this.state = {
            productId: "",
            productImage: "",
            productName: "",
            productDescription: "",
            productPrice: 0,
            isLoaded: false
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        const getProductId = navigation.getParam("productId", "");

        axios
            .get(`${productsEndpoint}/${getProductId}`)
            .then(response => {
                const detailProduct = response.data.data;

                this.setState({
                    productId: detailProduct.id,
                    productImage: detailProduct.image,
                    productName: detailProduct.name,
                    productPrice: detailProduct.price,
                    productDescription: detailProduct.description,
                    isLoaded: true
                });
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        const { isLoaded } = this.state;

        const newDescription = this.state.productDescription.split(",");
        const descComponent = newDescription.map((x, i) => (
            <Text style={{ paddingBottom: 5 }} key={i}>
                - {x}
            </Text>
        ));
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
                                productImage={`${baseUrl}${item.productImage}`}
                                productName={item.productName}
                                productPrice={item.productPrice
                                    .toString()
                                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                                productDescription={descComponent}
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
