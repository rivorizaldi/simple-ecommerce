import { Card, CardItem, Left, Text } from "native-base";
import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

class Product extends Component {
    render() {
        return (
            <Card style={styles.cardContainer}>
                <TouchableOpacity onPress={this.props.goToProductDetail}>
                    <CardItem cardBody>
                        <Image
                            source={this.props.productPhoto}
                            style={{
                                height: 150,
                                width: null,
                                flex: 1
                            }}
                        />
                    </CardItem>
                    <CardItem style={styles.cardItemText}>
                        <Left>
                            <Text>{this.props.productName}</Text>
                        </Left>
                    </CardItem>
                    <CardItem style={styles.cardItemText}>
                        <Left>
                            <Text>{this.props.productPrice}</Text>
                        </Left>
                    </CardItem>
                </TouchableOpacity>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 0.5,
        marginRight: 8
    },
    cardItemText: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8
    }
});

export default Product;
