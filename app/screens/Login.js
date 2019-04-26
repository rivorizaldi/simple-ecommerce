import {
    Button,
    Container,
    Content,
    Form,
    H1,
    Icon,
    Input,
    Item,
    Label,
    Text
} from "native-base";
import React, { Component } from "react";
import { BackHandler, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { storesUserData } from "../redux/actions/user";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        };
    }

    static navigationOptions = ({ navigation }) => ({
        headerLeft: (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Homescreen");
                }}
                style={{ marginLeft: 16 }}
            >
                <Icon type="FontAwesome5" name="arrow-left" />
            </TouchableOpacity>
        )
    });

    componentDidMount() {
        this.props.navigation.addListener("willFocus", () => {
            BackHandler.addEventListener("hardwareBackPress", () => {
                this.props.navigation.navigate("Homescreen");
                return true;
            });
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.user.isFulfilled) {
            this.props.navigation.navigate("Homescreen", {
                loginFulfilled: "You are Logged In!"
            });
        }
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
                        Sign In
                    </H1>
                    <Form>
                        <Item stackedLabel style={{ marginRight: 15 }}>
                            <Label>Username</Label>
                            <Input
                                onChangeText={text => {
                                    this.setState({
                                        email: text
                                    });
                                }}
                            />
                        </Item>
                        <Item stackedLabel style={{ marginRight: 15 }}>
                            <Label>Password</Label>
                            <Input
                                onChangeText={text => {
                                    this.setState({
                                        password: text
                                    });
                                }}
                            />
                        </Item>
                        <Button
                            block
                            onPress={() => {
                                this.props.storesUserData(
                                    this.state.email,
                                    this.state.password
                                );
                            }}
                            style={{
                                marginTop: 8,
                                marginLeft: 15,
                                marginRight: 15
                            }}
                        >
                            <Text>Sign In</Text>
                        </Button>
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
                                    this.props.navigation.navigate(
                                        "RegisterScreen"
                                    );
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

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        storesUserData: (email, pass) => dispatch(storesUserData(email, pass))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
