import { Body, Button, Card, CardItem, Text } from "native-base";
import React, { Component } from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/user";

class Account extends Component {
    componentDidMount() {
        if (this.props.isLoggedIn) {
            this.props.navigation.navigate("LoginScreen");
        } else {
            this.props.navigation.addListener("didFocus", () => {
                this.props.getUserData(access_token);
            });
        }
    }

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

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserData: access_token => dispatch(getUserData(access_token))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Account);
