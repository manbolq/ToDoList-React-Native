import React from "react";
import { Text, View, StyleSheet } from "react-native";
import ReactNativeCalendarStrip from "react-native-calendar-strip";
import es from "moment/locale/es";

//export let selectedDate = new Date();

export default function Calendar() {
    return (
        <View>
            <ReactNativeCalendarStrip
                onDateSelected={(date) => (selectedDate = date)}
                scrollable
                daySelectionAnimation={{
                    type: "background",
                    highlightColor: "#F32F2F",
                    // type: "border",
                    // borderWidth: 1.5,
                    // borderHighlightColor: "#F32F2F",
                }}
                style={{ height: 150, paddingTop: 20, paddingBottom: 10, marginBottom: 10 }}
                calendarHeaderStyle={{
                    color: "#F32F2F",
                    fontSize: 20,
                    fontWeight: "700",
                    marginBottom: 20,
                }}
                calendarColor={"#fff"}
                dateNumberStyle={{ color: "black" }}
                dateNameStyle={{ color: "black" }}
                highlightDateNumberStyle={{ color: "white" }}
                highlightDateNameStyle={{ color: "white" }}
                iconContainer={{ flex: 0.1 }}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1 },
});
