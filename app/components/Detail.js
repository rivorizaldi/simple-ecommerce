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
        const description = this.props.productDescription.split(",");
        const descComponent = description.map((x, i) => (
            <Text style={{ paddingBottom: 5 }} key={i}>
                - {x}
            </Text>
        ));
        console.log(test);

        return (
            <ScrollView>
                <Card>
                    <CardItem cardBody>
                        <Image
                            style={styles.imageCustom}
                            source={{
                                uri: this.props.productImage
                            }}
                            resizeMode="cover"
                        />
                        <Fab
                            style={styles.fabCustom}
                            onPress={this.props.toggleActive}
                        >
                            <Icon
                                style={
                                    this.props.isActive
                                        ? styles.iconActive
                                        : styles.icon
                                }
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
                            <Icon type="FontAwesome5" name="home" />
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
                        <Body>{descComponent}</Body>
                    </CardItem>
                </Card>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    imageCustom: {
        flex: 1,
        width: 200,
        height: 400
    },
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
    iconActive: {
        color: "red"
    },
    icon: {
        color: "gray"
    }
});

export default Details;
