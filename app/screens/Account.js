import { Body, Button, Card, CardItem, Text } from "native-base";
import React, { Component } from "react";
import { Image } from "react-native";
import { connect } from "react-redux";

class Account extends Component {
    componentDidMount() {
        this.props.navigation.addListener("willFocus", () => {
            if (!this.props.user.isLoggedIn) {
                this.props.navigation.navigate("LoginScreen");
            }
        });
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
                        <Text>username</Text>
                        <Text>{this.props.user.userData.username}</Text>
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
                        <Text>{this.props.user.userData.email}</Text>
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
                    <Button
                        full
                        danger
                        style={{ flex: 1 }}
                        onPress={() => {
                            this.props.navigation.navigate("LoginScreen");
                        }}
                    >
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

// const mapDispatchToProps = dispatch => {
//     return {
//         fetchUseData: access_token => dispatch(fetchUseData(access_token))
//     };
// };

export default connect(
    mapStateToProps,
    null
)(Account);
