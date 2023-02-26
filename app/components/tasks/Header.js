import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function Header({ navigation, selectedDate }) {
    return (
        <View style={styles.container}>
            <View
                style={{
                    width: "75%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}
            >
                <Icon
                    icon="chevron-left"
                    onPress={() => navigation.navigate("Home")}
                />
                <Text style={styles.text}>Tareas</Text>
            </View>
            <View
                style={{
                    width: "25%",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                }}
            >
                <Icon
                    icon="plus"
                    onPress={() => {
                        navigation.navigate("AddTaskMenu", {
                            task: null,
                            selectedDate: new Date(selectedDate),
                        });
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 60,
        backgroundColor: "#F32F2F",
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontSize: 25,
        fontWeight: "450",
        paddingLeft: 10,
    },
});

const Icon = (props) => (
    <TouchableOpacity
        activeOpacity={0.5}
        onPress={props.onPress !== null ? props.onPress : null}
    >
        <FontAwesome5
            name={props.icon}
            size={25}
            style={{
                paddingHorizontal: 15,
                alignSelf: "center",
                color: "#fff",
            }}
        />
    </TouchableOpacity>
);
