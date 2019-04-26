import {
    Button,
    Container,
    Content,
    Form,
    H1,
    Input,
    Item,
    Label,
    Text
} from "native-base";
import React, { Component } from "react";
import { BackHandler, TouchableOpacity } from "react-native";

class Register extends Component {
    componentDidMount() {
        this.props.navigation.addListener("willFocus", () => {
            BackHandler.addEventListener("hardwareBackPress", () => {
                this.props.navigation.navigate("LoginScreen");
                return true;
            });
        });
    }

    render() {
        return (
            <Container>
                <Content
                    contentContainerStyle={{
                        backgroundColor: "#fff",
                        flex: 1,
                        justifyContent: "center",
                        paddingRight: 16,
                        paddingLeft: 16
                    }}
                >
                    <H1 style={{ textAlign: "center", fontSize: 30 }}>
                        Sign Up
                    </H1>
                    <Form>
                        <Item stackedLabel style={{ marginRight: 15 }}>
                            <Label>Username</Label>
                            <Input />
                        </Item>
                        <Item stackedLabel style={{ marginRight: 15 }}>
                            <Label>Email</Label>
                            <Input />
                        </Item>
                        <Item stackedLabel style={{ marginRight: 15 }}>
                            <Label>Password</Label>
                            <Input />
                        </Item>
                        <Button
                            block
                            onPress={() => {}}
                            style={{
                                marginTop: 8,
                                marginLeft: 15,
                                marginRight: 15
                            }}
                        >
                            <Text>Sign Up</Text>
                        </Button>
                        <Form
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                marginTop: 8
                            }}
                        >
                            <Label style={{ marginRight: 1 }}>
                                Have An Account ?
                            </Label>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate(
                                        "LoginScreen"
                                    );
                                }}
                            >
                                <Text>Sign In</Text>
                            </TouchableOpacity>
                        </Form>
                    </Form>
                </Content>
            </Container>
        );
    }
}

export default Register;
