import { Container, Icon, Text } from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";

class EmptyCart extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <Icon
                    style={styles.icon}
                    type="AntDesign"
                    name="shoppingcart"
                    position="bottomRight"
                />
                <Text style={styles.text}>Cart Still Empty</Text>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        color: "gray",
        fontSize: 200
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "gray"
    }
});

export default EmptyCart;
