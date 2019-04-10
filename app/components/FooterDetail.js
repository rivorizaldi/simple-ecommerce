import { Button, Footer, Text } from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";

class FooterDetail extends Component {
    render() {
        return (
            <Footer style={styles.footerCustom}>
                <Button style={styles.buttonCustom} onPress={this.props.buyNoW}>
                    <Text>Buy Now</Text>
                </Button>
                <Button
                    style={styles.buttonCustom}
                    onPress={this.props.addCart}
                >
                    <Text>Add To Cart</Text>
                </Button>
            </Footer>
        );
    }
}

const styles = StyleSheet.create({
    buttonCustom: {
        flex: 0.5,
        backgroundColor: "#ff5722",
        color: "#ffffff",
        marginLeft: 6,
        marginRight: 6,
        marginTop: 6,
        alignItems: "center",
        justifyContent: "center"
    },
    footerCustom: {
        backgroundColor: "white",
        paddingBottom: 8
    }
});

export default FooterDetail;
