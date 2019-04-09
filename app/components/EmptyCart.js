import { Container, Icon, Text } from "native-base";
import React, { Component } from "react";

class EmptyCart extends Component {
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
                <Text
                    style={{ fontSize: 20, fontWeight: "bold", color: "gray" }}
                >
                    Cart Still Empty
                </Text>
            </Container>
        );
    }
}

export default EmptyCart;
