import { Text } from "native-base";
import React, { Component } from "react";
import { Image } from "react-native";
import { Grid, Row } from "react-native-easy-grid";

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
            <Grid>
                <Row>
                    <Image
                        source={getProductImage}
                        style={{
                            flex: 1,
                            alignSelf: "stretch",
                            height: undefined,
                            width: undefined
                        }}
                        resizeMode="contain"
                    />
                </Row>

                <Row>
                    <Text>{getProductName}</Text>
                    <Text>{getProductPrice}</Text>
                </Row>
            </Grid>
        );
    }
}

export default ProductList;
