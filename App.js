import { Root } from "native-base";
import React, { Component } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator
} from "react-navigation";
import { Provider } from "react-redux";
import store from "./app/redux/store";
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
                let IconComponent = FontAwesome5;
                let iconName;
                if (routeName === "Homescreen") {
                    iconName = "home";
                } else if (routeName === "CartScreen") {
                    iconName = `shopping-cart`;
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
            <Provider store={store}>
                <Root>
                    <AppContainer
                        ref={navigatorRef => {
                            NavigationService.setTopLevelNavigator(
                                navigatorRef
                            );
                        }}
                    />
                </Root>
            </Provider>
        );
    }
}
