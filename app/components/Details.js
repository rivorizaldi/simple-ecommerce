import {
    Body,
    Card,
    CardItem,
    Fab,
    H1,
    H3,
    Icon,
    Left,
    Right,
    Text
} from "native-base";
import React, { Component } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";

class Details extends Component {
    render() {
        return (
            <ScrollView>
                <Card>
                    <CardItem cardBody>
                        <Image
                            source={this.props.productImage}
                            style={{
                                flex: 1,
                                height: 250
                            }}
                            resizeMode="cover"
                        />
                        <Fab style={styles.fabCustom}>
                            <Icon
                                style={styles.iconCustom}
                                type="AntDesign"
                                name="heart"
                                position="bottomRight"
                            />
                        </Fab>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <H1 style={styles.itemName}>
                                {this.props.productName}
                            </H1>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <H3 style={styles.itemPrice}>
                                Rp. {this.props.productPrice}
                            </H3>
                        </Left>
                    </CardItem>
                </Card>
                <Card>
                    <CardItem>
                        <Body>
                            <Text>
                                5 Courier Avaible. Shipping Charges Start From
                                Rp. 5000
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Body style={{ flexDirection: "row" }}>
                            <Icon type="AntDesign" name="home" />
                            <Text
                                style={{
                                    paddingTop: 5,
                                    paddingLeft: 5
                                }}
                            >
                                From Tanggerang City
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Body style={{ flexDirection: "row" }}>
                            <Icon type="FontAwesome5" name="truck" />
                            <Text
                                style={{
                                    paddingTop: 5,
                                    paddingLeft: 5
                                }}
                            >
                                To Reg Sidoarjo
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card>
                    <CardItem>
                        <Body>
                            <Text style={{ fontWeight: "bold" }}>
                                Product Information
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text style={{ marginLeft: 0 }}>Min. Order</Text>
                        </Left>
                        <Right>
                            <Text>1</Text>
                        </Right>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Text style={{ marginLeft: 0 }}>Condition</Text>
                        </Left>
                        <Right>
                            <Text>New</Text>
                        </Right>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text style={{ fontWeight: "bold" }}>
                                Product Description
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint
                                occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    itemPrice: {
        color: "#ff5722",
        fontWeight: "bold"
    },
    itemName: {
        color: "#494d52",
        fontWeight: "bold"
    },
    fabCustom: {
        backgroundColor: "#fff"
    },
    iconCustom: {
        color: "gray"
    }
});

export default Details;
