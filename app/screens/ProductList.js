import axios from "axios";
import { Container } from "native-base";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import Product from "../components/Product";

class ProductList extends Component {
    constructor() {
        super();
        this.state = {
            listProduct: [],
            isLoaded: false
        };
    }

    componentDidMount() {
        const baseUrl = "http://192.168.43.204:3333";

        axios
            .get(baseUrl + "/v1/products")
            .then(response => {
                const listProduct = response.data.data;
                this.setState({
					listProduct,
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
                        keyExtractor={(item, index) => {
                            index;
                        }}
                        columnWrapperStyle={{
                            marginTop: 8,
                            marginLeft: 8,
                            alignItems: "space-between"
                        }}
                        horizontal={false}
                        numColumns={2}
                        data={this.state.listProduct}
                        renderItem={({ item }) => (
                            <Product
                                productName={item.name}
                                productPrice={item.price
                                    .toString()
                                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                                productPhoto={`http://192.168.43.204:3333${
                                    item.image
                                }`}
                                goToProductDetail={() =>
                                    this.props.navigation.navigate(
                                        "Detailscreen",
                                        {
                                            productId: item.id
                                        }
                                    )
                                }
                            />
                        )}
                    />
                ) : (
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <ActivityIndicator size="small" color="#ff5722" />
                    </View>
                )}
            </Container>
        );
    }
}

export default ProductList;
