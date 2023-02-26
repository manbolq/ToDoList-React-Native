import { StyleSheet, Platform, SafeAreaView, StatusBar } from "react-native";
import { LogBox } from "react-native";
import RootNavigation from "./navigation";

LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
    "Non-serializable values were found in the navigation state",
]);

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <RootNavigation />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
});
