import {
    Body,
    Button,
    Card,
    CardItem,
    Icon,
    Input,
    Item,
    Left,
    Right,
    Text,
    Thumbnail
} from "native-base";
import React, { Component } from "react";

class ProductCart extends Component {
    render() {
        return (
            <Card>
                <CardItem
                    header
                    bordered
                    style={{
                        justifyContent: "flex-end",
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingLeft: 0,
                        paddingRight: 0
                    }}
                >
                    <Button small transparent onPress={this.props.deleteList}>
                        <Icon
                            type="Entypo"
                            name="cross"
                            style={{ fontSize: 20, color: "gray" }}
                        />
                    </Button>
                </CardItem>
                <CardItem>
                    <Left>
                        <Thumbnail
                            square
                            source={{
                                uri: this.props.productImage
                            }}
                        />
                        <Body>
                            <Text style={{ fontSize: 15 }}>
                                {this.props.productName}
                            </Text>
                            <Text style={{ color: "#ff5722", fontSize: 15 }}>
                                Rp.
                                {this.props.productPrice}
                            </Text>
                        </Body>
                    </Left>
                    <Right style={{ flexDirection: "row" }}>
                        <Button
                            small
                            rounded
                            bordered
                            success
                            onPress={this.props.decrementButton}
                        >
                            <Icon
                                type="AntDesign"
                                name="minus"
                                style={{ fontSize: 12 }}
                            />
                        </Button>
                        <Item
                            style={{
                                width: 30,
                                height: 20,
                                margin: 3
                            }}
                        >
                            <Input
                                style={{
                                    textAlign: "center"
                                }}
                                value={this.props.quantity
                                    .toString()
                                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                                keyboardType="numeric"
                                onEndEditing={this.props.editingText}
                                onChangeText={this.props.textChange}
                            />
                        </Item>
                        <Button
                            small
                            rounded
                            bordered
                            success
                            onPress={this.props.incrementButton}
                        >
                            <Icon
                                type="AntDesign"
                                name="plus"
                                style={{ fontSize: 12 }}
                            />
                        </Button>
                    </Right>
                </CardItem>
            </Card>
        );
    }
}

export default ProductCart;
