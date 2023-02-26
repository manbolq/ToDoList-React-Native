import React, { useEffect, useState } from "react";
import { Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NextTasks from "../components/home/NextTasks";
import Title from "../components/home/Title";
import { auth } from "../../firebase";

export default function Home({ navigation }) {
    // const [currentUser, setCurrentUser] = useState([]);

    // useEffect(() => {
    //     setCurrentUser(auth.currentUser);
    // }, []);

    return (
        <View style={styles.container}>
            <Title />
            <Image
                resizeMode="contain"
                style={{
                    alignSelf: "center",
                    height: "25%",
                    marginBottom: 40,
                }}
                source={require("../assets/logo.png")}
            />

            <TouchableOpacity
                activeOpacity={0.7}
                style={{
                    alignItems: "center",
                    borderRadius: 30,
                    margin: 30,
                    height: "10%",
                    width: "80%",
                    backgroundColor: "#F26F6F",
                    borderWidth: 9,
                    borderColor: "#954242",
                }}
                onPress={() => navigation.navigate("Tasks")}
            >
                <Text
                    style={{
                        flex: 1,
                        fontSize: 40,
                        fontWeight: "500",
                        textAlignVertical: "center",
                    }}
                >
                    Ver tareas
                </Text>
            </TouchableOpacity>
            <NextTasks />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F6E6E6",
    },
});
