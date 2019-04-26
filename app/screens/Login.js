import {
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
import { TouchableOpacity } from "react-native";

class Login extends Component {
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
                        Sign In
                    </H1>
                    <Form>
                        <Item stackedLabel style={{ marginRight: 15 }}>
                            <Label>Username</Label>
                            <Input />
                        </Item>
                        <Item stackedLabel style={{ marginRight: 15 }}>
                            <Label>Password</Label>
                            <Input />
                        </Item>
                        <Form
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                marginTop: 8
                            }}
                        >
                            <Label style={{ marginRight: 1 }}>
                                Dont Have Account ?
                            </Label>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.nav;
                                }}
                            >
                                <Text>Sign Up</Text>
                            </TouchableOpacity>
                        </Form>
                    </Form>
                </Content>
            </Container>
        );
    }
}

export default Login;
