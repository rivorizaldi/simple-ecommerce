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
import Account from "./app/screens/Account";
import AddBuyNow from "./app/screens/AddBuyNow";
import AddToCart from "./app/screens/AddToCart";
import Cart from "./app/screens/Cart";
import CheckOut from "./app/screens/CheckOut";
import DetailProduct from "./app/screens/DetailProduct";
import Login from "./app/screens/Login";
import ProductList from "./app/screens/ProductList";
import Register from "./app/screens/Register";
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
        },
        AccountScreen: {
            screen: Account,
            navigationOptions: () => ({
                title: "Account"
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
                } else if (routeName === "AccountScreen") {
                    iconName = "user-alt";
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
    } else if (routeName === "AccountScreen") {
        title = "Profile";
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
                    backgroundColor: "#fff",
                    fontFamily: "Montserrat-Bold",
                    fontWeight: "bold"
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
                    backgroundColor: "#fff",
                    fontFamily: "Montserrat-Bold",
                    fontWeight: "bold"
                },
                headerTintColor: "#000"
            })
        },
        AddBuyNowAScreen: {
            screen: AddBuyNow,
            navigationOptions: () => ({
                title: "Product Buy Now Detail",
                headerStyle: {
                    backgroundColor: "#fff",
                    fontFamily: "Montserrat-Bold",
                    fontWeight: "bold"
                },
                headerTintColor: "#000"
            })
        },
        CheckOutScreen: {
            screen: CheckOut,
            navigationOptions: () => ({
                title: "CheckOut",
                headerStyle: {
                    backgroundColor: "#fff",
                    fontFamily: "Montserrat-Bold",
                    fontWeight: "bold"
                },
                headerTintColor: "#000"
            })
        },
        RegisterScreen: {
            screen: Register,
            navigationOptions: () => ({
                title: "Register",
                headerStyle: {
                    backgroundColor: "#fff",
                    fontFamily: "Montserrat-Bold",
                    fontWeight: "bold"
                },
                headerTintColor: "#000"
            })
        },
        LoginScreen: {
            screen: Login,
            navigationOptions: () => ({
                title: "Login",
                headerStyle: {
                    backgroundColor: "#fff",
                    fontFamily: "Montserrat-Bold",
                    fontWeight: "bold"
                },
                headerTintColor: "#000"
            })
        },
        AccountScreen: {
            screen: Account,
            navigationOptions: () => ({
                title: "Acount",
                headerStyle: {
                    backgroundColor: "#fff",
                    fontFamily: "Montserrat-Bold",
                    fontWeight: "bold"
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
