import { Container } from "native-base";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import Product from "../components/Product";
import { baseUrl } from "../helper/routes";
import { showProduct } from "../redux/actions/products";

class ProductList extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: false
        };
    }

    componentDidUpdate() {
        console.log("did update", this.props.productList);
    }

    componentDidMount() {
        console.log("didmount", this.props.productList);
        const { navigation } = this.props;
        navigation.addListener("willBlur", () => {
            this.setState({
                isLoaded: false
            });
        });

        navigation.addListener("didFocus", () => {
            console.log("dalam didfocus", this.props.productList);
            this.props.showProductlist();

            if (this.props.productList.length > 0) {
                this.setState({
                    isLoaded: true
                });
            }
        });
        console.log("setelah didfocus", this.props.productList);
    }

    render() {
        // const { isLoaded } = this.state;
        // console.log("render", this.props.productList);
        return (
            <Container>
                {this.props.isLoaded ? (
                    <FlatList
                        columnWrapperStyle={{
                            marginTop: 8,
                            marginLeft: 8,
                            alignItems: "space-between"
                        }}
                        keyExtractor={item => item.id.toString()}
                        horizontal={false}
                        numColumns={2}
                        data={this.props.productList}
                        renderItem={({ item }) => (
                            <Product
                                productName={item.name}
                                productPrice={item.price
                                    .toString()
                                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                                productPhoto={`${baseUrl}${item.image}`}
                                goToProductDetail={() =>
                                    this.props.navigation.navigate(
                                        "Detailscreen",
                                        {
                                            productId: item.id
                                        }
                                    )
                                }
                            />
                        )}
                    />
                ) : (
                    <View style={style.spinnerCustom}>
                        <ActivityIndicator size="small" color="#ff5722" />
                    </View>
                )}
            </Container>
        );
    }
}

const style = StyleSheet.create({
    spinnerCustom: {
        flex: 1,
        justifyContent: "center"
    }
});

const mapStateToProps = state => {
    console.log("mapstate", state.products.productList);
    return {
        productList: state.products.productList,
        isLoaded: state.products.isLoaded
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showProductlist: () => dispatch(showProduct())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);
