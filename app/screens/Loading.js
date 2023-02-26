// import { signInAnonymously } from "firebase/auth/react-native";
import React, { useEffect, Component, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

export default function Loading({ navigation }) {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
        user
            ? navigation.navigate("Home")
            : signInAnonymously(auth).then(() => navigation.navigate("Home"));
    });

    // useEffect(() => {
    //     auth.onAuthStateChanged(function (user) {
    //         console.log(user);
    //         if (user) {
    //             navigation.navigate("Home");
    //         } else {
    //             signInAnonymously(auth);
    //         }
    //     });
    // }, []);

    return (
        <View style={styles.container}>
            <Text style={{ color: "#e93766", fontSize: 40 }}>Cargando...</Text>
            <ActivityIndicator
                color="#F26F6F"
                size="large"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
