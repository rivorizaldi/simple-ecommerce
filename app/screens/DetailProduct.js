import { Container } from "native-base";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import Detail from "../components/Detail";
import FooterDetail from "../components/FooterDetail";
import { baseUrl } from "../helper/routes";
import { fetchDataDetail } from "../redux/actions/products";

class DetailProduct extends Component {
    constructor() {
        super();
        this.state = {
            isActive: false
        };
    }

    toggleActive = () => {
        this.setState({
            isActive: !this.state.isActive
        });
    };

    isEmpty = obj => {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) return false;
        }
        return true;
    };

    render() {
        return (
            <Container>
                {this.props.productDetail.isPending && (
                    <View style={style.spinnerCustom}>
                        <ActivityIndicator size="small" color="#ff5722" />
                    </View>
                )}
                {this.isEmpty(this.props.productDetail.productDetail) ? null : (
                    <FlatList
                        keyExtractor={item => item.id.toString()}
                        data={[this.props.productDetail.productDetail]}
                        renderItem={({ item }) => (
                            <Detail
                                productImage={`${baseUrl}${item.image}`}
                                productName={item.name}
                                productPrice={item.price
                                    .toString()
                                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                                productDescription={item.description}
                                toggleActive={this.toggleActive}
                                isActive={this.state.isActive}
                            />
                        )}
                    />
                )}

                <FooterDetail
                    buyNoW={() => {
                        this.props.navigation.navigate("AddBuyNowAScreen");
                        this.props.fecthDataDetail(
                            this.props.productDetail.productDetail.id
                        );
                    }}
                    addCart={() => {
                        this.props.navigation.navigate("AddChartScreen");
                        this.props.fecthDataDetail(
                            this.props.productDetail.productDetail.id
                        );
                    }}
                />
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
        productDetail: state.products
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fecthDataDetail: id => dispatch(fetchDataDetail(id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailProduct);
