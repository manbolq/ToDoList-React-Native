import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./app/screens/Home";
import Tasks from "./app/screens/Tasks";
import AddTaskMenu from "./app/screens/AddTaskMenu";
import Loading from "./app/screens/Loading";
import Testing from "./app/screens/Testing";

export default function RootNavigation() {
    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: false,
    };

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Loading"
                screenOptions={screenOptions}
            >
                <Stack.Screen
                    name="Testing"
                    component={Testing}
                />
                <Stack.Screen
                    name="Loading"
                    component={Loading}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                />
                <Stack.Screen
                    name="Tasks"
                    component={Tasks}
                />
                <Stack.Screen
                    name="AddTaskMenu"
                    component={AddTaskMenu}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
