import { Body, Button, Card, CardItem, Text } from "native-base";
import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";

class Login extends Component {
    render() {
        return (
            <Card>
                <CardItem
                    header
                    bordered
                    style={{
                        justifyContent: "center",
                        flexDirection: "column"
                    }}
                >
                    <Image
                        style={{ height: 100, width: 100 }}
                        source={require("../assets/img/male-circle-512.png")}
                    />
                </CardItem>
                <CardItem bordered>
                    <Body
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text>Name</Text>
                        <Text>Rivo Rizaldi</Text>
                    </Body>
                </CardItem>
                <CardItem bordered>
                    <Body
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text>Email</Text>
                        <Text>Rivo.rizaldy18@gmail.com</Text>
                    </Body>
                </CardItem>
                <CardItem bordered>
                    <Body
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text>Phone Number</Text>
                        <Text>085298826043</Text>
                    </Body>
                </CardItem>
                <CardItem footer bordered>
                    <Button full danger style={{ flex: 1 }}>
                        <Text>Sign Out</Text>
                    </Button>
                </CardItem>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        alignSelf: "stretch"
    }
});

export default Login;
