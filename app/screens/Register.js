import { Button, Container, Form, Input, Item, Label, Text } from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";

class Register extends Component {
    static navigationOptions = {
        headerLeft: null
    };
    render() {
        return (
            <Container>
                <Form>
                    <Item floatingLabel style={{ marginRight: 15 }}>
                        <Label>Username</Label>
                        <Input />
                    </Item>
                    <Item floatingLabel style={{ marginRight: 15 }}>
                        <Label>Password</Label>
                        <Input />
                    </Item>
                </Form>
                <Button>
                    <Text>Register</Text>
                </Button>
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

export default Register;
