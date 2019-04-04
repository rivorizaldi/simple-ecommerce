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
                <CardItem>
                    <Left>
                        <Thumbnail square source={this.props.productImage} />
                        <Body>
                            <Text>{this.props.productName}</Text>
                            <Text style={{ color: "#ff5722" }}>
                                Rp.
                                {this.props.productPrice
                                    .toString()
                                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
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
                            <Icon type="AntDesign" name="minus" />
                        </Button>
                        <Item
                            style={{
                                width: 40,
                                height: 38,
                                margin: 3
                            }}
                        >
                            <Input
                                style={{
                                    width: 1,
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
                            <Icon type="AntDesign" name="plus" />
                        </Button>
                    </Right>
                </CardItem>
            </Card>
        );
    }
}

export default ProductCart;
