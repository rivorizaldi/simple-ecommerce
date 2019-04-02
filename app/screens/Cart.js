import { Container, Icon, Text } from "native-base";
import React, { Component } from "react";

class Cart extends Component {
    render() {
        return (
            <Container
                style={{ justifyContent: "center", alignItems: "center" }}
            >
                <Icon
                    style={{ color: "gray", fontSize: 200 }}
                    type="AntDesign"
                    name="shoppingcart"
                    position="bottomRight"
                />
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Keranjang Masih Kosong
                </Text>
            </Container>
        );
    }
}

export default Cart;
