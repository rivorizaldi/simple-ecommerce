import React, { Component } from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import DetailProduct from "./app/screens/DetailProduct";
import ProductList from "./app/screens/ProductList";

const AppNavigator = createStackNavigator(
    {
        Homescreen: {
            screen: ProductList,
            navigationOptions: () => ({
                title: "Product List",
                headerStyle: {
                    backgroundColor: "#5067FF"
                },
                headerTintColor: "#fff"
            })
        },
        Detailscreen: {
            screen: DetailProduct,
            navigationOptions: () => ({
                title: "Detail Product",
                headerStyle: {
                    backgroundColor: "#5067FF"
                },
                headerTintColor: "#fff"
            })
        }
    },
    {
        initialRouteName: "Homescreen"
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
    render() {
        return <AppContainer />;
    }
}
