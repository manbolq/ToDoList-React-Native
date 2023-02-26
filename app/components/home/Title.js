import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Title() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>ToDo List</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 60,
        fontWeight: "700",
    },
});
