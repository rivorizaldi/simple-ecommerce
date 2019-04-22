import { Container } from "native-base";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import Product from "../components/Product";
import { baseUrl } from "../helper/routes";
import {
    fetchDataDetail,
    fetchProductListData
} from "../redux/actions/products";

class ProductList extends Component {
    componentDidMount() {
        this.props.fecthDataList();
    }

    render() {
        console.log("object", this.props.productList.productList);
        return (
            <Container>
                {this.props.productList.isPending && (
                    <View style={style.spinnerCustom}>
                        <ActivityIndicator size="small" color="#ff5722" />
                    </View>
                )}
                {this.props.productList.productList.length ? (
                    <FlatList
                        columnWrapperStyle={{
                            marginTop: 8,
                            marginLeft: 8,
                            alignItems: "space-between"
                        }}
                        keyExtractor={item => item.id.toString()}
                        horizontal={false}
                        numColumns={2}
                        data={this.props.productList.productList}
                        renderItem={({ item }) => (
                            <Product
                                productName={item.name}
                                productPrice={item.price
                                    .toString()
                                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                                productPhoto={`${baseUrl}${item.image}`}
                                goToProductDetail={() => {
                                    this.props.navigation.navigate(
                                        "Detailscreen"
                                    );
                                    this.props.fecthDataDetail(item.id);
                                }}
                            />
                        )}
                    />
                ) : null}
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
    return {
        productList: state.products
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fecthDataList: () => dispatch(fetchProductListData()),
        fecthDataDetail: id => dispatch(fetchDataDetail(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);
