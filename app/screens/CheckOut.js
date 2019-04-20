import {
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Footer,
    Form,
    Icon,
    Item,
    Picker,
    Text
} from "native-base";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

class CheckOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected2: undefined,
            isModalVisible: false,
            showToast: false
        };
    }

    onValueChange2(value) {
        this.setState({
            selected2: value
        });
    }

    toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    render() {
        const { navigation } = this.props;
        const getTotalPrice = navigation.getParam("totalPrice", "");
        const getTotalPriceBuy = navigation.getParam("productPrice", "");
        // const shipment =
        //     undefined ||
        //     this.state.selected2
        //         .replace(/\./g, "")
        //         .match(/\d+/g)
        //         .map(Number);
        console.log(this.state.selected2);
        return (
            <Container>
                <Content padder>
                    <Card>
                        <CardItem header bordered>
                            <Text>Address Destination</Text>
                        </CardItem>
                        <CardItem style={{ paddingBottom: 5 }}>
                            <Text style={{ color: "#757575" }}>Address</Text>
                        </CardItem>
                        <CardItem style={{ paddingBottom: 5, paddingTop: 5 }}>
                            <Text style={{ fontWeight: "bold" }}>
                                Rivo Rizaldi
                            </Text>
                        </CardItem>
                        <CardItem bordered style={{ paddingTop: 5 }}>
                            <Text>
                                Perumahan Jaya Maspion Permata B3 No 21,
                                Gedangan, Kab Sidoarjo, Jawa Timur, 085298826043
                            </Text>
                        </CardItem>
                        <CardItem footer bordered>
                            <Button
                                full
                                bordered
                                style={{ flex: 1, borderColor: "#757575" }}
                            >
                                <Text style={{ color: "#757575" }}>
                                    Change Address
                                </Text>
                            </Button>
                        </CardItem>
                    </Card>

                    <Form style={{ marginTop: 17 }}>
                        <Text style={{ fontWeight: "bold" }}>
                            Choose Your Courier
                        </Text>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select your Couriee"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected2}
                                onValueChange={this.onValueChange2.bind(this)}
                            >
                                <Picker.Item
                                    label="JNE Reguler (18.000)"
                                    value="key0"
                                />
                                <Picker.Item
                                    label="TIKI Reguler (18.000)"
                                    value="key1"
                                />
                                <Picker.Item
                                    label="J&T Reguler (20.000)"
                                    value="key2"
                                />
                            </Picker>
                        </Item>
                    </Form>
                </Content>
                <Footer style={styles.footerCustom}>
                    <Container
                        style={{
                            flex: 0.3
                        }}
                    >
                        <Text>Total Payment</Text>
                        <Text style={{ color: "#ff5722" }}>
                            Rp.
                            {getTotalPrice
                                .toString()
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") ||
                                getTotalPriceBuy
                                    .toString()
                                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                        </Text>
                    </Container>
                    <Button
                        style={styles.buttonCustom}
                        onPress={this.toggleModal}
                    >
                        <Text>Pay</Text>
                    </Button>
                </Footer>
                <Modal
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={this.toggleModal}
                    onBackButtonPress={this.toggleModal}
                    animationOutTiming={300}
                    animationIn={"fadeIn"}
                    animationOut={"fadeOut"}
                >
                    <View
                        style={{
                            backgroundColor: "#fff",
                            justifyContent: "center",
                            padding: 8,
                            borderRadius: 5
                        }}
                    >
                        <Text style={{ fontWeight: "bold" }}>
                            Do you want to Pay Now ?
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-end"
                            }}
                        >
                            <Button transparent dark>
                                <Text>Yes</Text>
                            </Button>

                            <Button transparent dark onPress={this.toggleModal}>
                                <Text>No</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    buttonCustom: {
        backgroundColor: "#ff5722",
        color: "#ffffff",
        marginLeft: 6,
        marginRight: 6,
        marginTop: 6,
        flex: 0.7,
        alignSelf: "center",
        justifyContent: "center"
    },
    footerCustom: {
        backgroundColor: "white",
        paddingBottom: 8
    }
});

export default CheckOut;
