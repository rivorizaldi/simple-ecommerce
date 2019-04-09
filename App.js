import React, { Component } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator
} from "react-navigation";
import AddBuyNow from "./app/screens/AddBuyNow";
import AddToCart from "./app/screens/AddToCart";
import Cart from "./app/screens/Cart";
import CheckOut from "./app/screens/CheckOut";
import DetailProduct from "./app/screens/DetailProduct";
import ProductList from "./app/screens/ProductList";
import NavigationService from "./NavigationService";

const AppTabNavigator = createBottomTabNavigator(
    {
        Homescreen: {
            screen: ProductList,
            navigationOptions: () => ({
                tabBarLabel: "Home"
            })
        },
        CartScreen: {
            screen: Cart,
            navigationOptions: () => ({
                title: "Cart"
            })
        }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = AntDesign;
                let iconName;
                if (routeName === "Homescreen") {
                    iconName = "home";
                } else if (routeName === "CartScreen") {
                    iconName = `shoppingcart`;
                }

                return (
                    <IconComponent
                        name={iconName}
                        size={25}
                        color={tintColor}
                    />
                );
            }
        }),
        resetOnBlur: true,
        tabBarOptions: {
            activeTintColor: "#03ac0e",
            inactiveTintColor: "#494d52"
        }
    }
);

AppTabNavigator.navigationOptions = ({ navigation }) => {
    let { routeName } = navigation.state.routes[navigation.state.index];

    let title;
    if (routeName === "Homescreen") {
        title = "Product List";
    } else if (routeName === "CartScreen") {
        title = "Cart";
    }
    return { title };
};

const AppNavigator = createStackNavigator(
    {
        TabHome: AppTabNavigator,
        Detailscreen: {
            screen: DetailProduct,
            navigationOptions: () => ({
                title: "Product Details",
                headerStyle: {
                    backgroundColor: "#fff"
                },
                headerTintColor: "#000",
                tabBarVisible: "false"
            })
        },
        AddChartScreen: {
            screen: AddToCart,
            navigationOptions: () => ({
                title: "Product Cart Detail",
                headerStyle: {
                    backgroundColor: "#fff"
                },
                headerTintColor: "#000"
            })
        },
        AddBuyNowAScreen: {
            screen: AddBuyNow,
            navigationOptions: () => ({
                title: "Product Buy Now Detail",
                headerStyle: {
                    backgroundColor: "#fff"
                },
                headerTintColor: "#000"
            })
        },
        CheckOutScreen: {
            screen: CheckOut,
            navigationOptions: () => ({
                title: "CheckOut",
                headerStyle: {
                    backgroundColor: "#fff"
                },
                headerTintColor: "#000"
            })
        }
    },
    {
        initialRouteName: "TabHome"
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
    render() {
        return (
            <AppContainer
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }}
            />
        );
    }
}
