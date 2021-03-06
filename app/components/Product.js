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
                            style={styles.imageCustom}
                            source={{
                                uri: this.props.productPhoto
                            }}
                        />
                    </CardItem>
                    <CardItem style={styles.cardItemText}>
                        <Left>
                            <Text
                                style={{
                                    fontFamily: "Montserrat-Bold",
                                    fontWeight: "bold"
                                }}
                            >
                                {this.props.productName}
                            </Text>
                        </Left>
                    </CardItem>
                    <CardItem style={styles.cardItemPrice}>
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
        height: 100,
        paddingTop: 0,
        paddingBottom: 0,
        alignItems: "flex-start",
        fontFamily: "Montserrat-Bold",
        fontWeight: "bold"
    },
    cardItemPrice: {
        padding: 0
    },
    imageCustom: {
        width: 165,
        height: 200
    },
    itemPrice: {
        color: "#ff5722"
    },
    itemName: {
        color: "#494d52"
    }
});

export default Product;
