import { Card, CardItem, Left, Text } from "native-base";
import React, { Component } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

class Product extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.goToProductDetail}>
                <Card style={styles.cardContainer}>
                    <CardItem cardBody>
                        <Image
                            style={{ width: 165, height: 200 }}
                            source={{
                                uri: this.props.productPhoto
                            }}
                        />
                    </CardItem>
                    <CardItem
                        style={{
                            height: 100,
                            paddingTop: 0,
                            paddingBottom: 0,
                            alignItems: "flex-start"
                        }}
                    >
                        <Left>
                            <Text>{this.props.productName}</Text>
                        </Left>
                    </CardItem>
                    <CardItem style={{ padding: 0 }}>
                        <Left>
                            <Text style={styles.itemPrice}>
                                Rp. {this.props.productPrice}
                            </Text>
                        </Left>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 0.5,
        marginRight: 8,
        height: 350
    },
    cardItemText: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8
    },
    itemPrice: {
        color: "#ff5722"
    },
    itemName: {
        color: "#494d52"
    }
});

export default Product;
