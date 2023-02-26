import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
// import Calendar from "../components/tasks/Calendar";
import Header from "../components/tasks/Header";
import { Divider } from "react-native-elements";
import TaskItems from "../components/tasks/TaskItems";
import { TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
// import AddTaskButton from "../components/tasks/AddTaskButton";
import ReactNativeCalendarStrip from "react-native-calendar-strip";
import { auth } from "../../firebase";
import es from "moment/locale/es";

export default function Tasks({ navigation }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        setCurrentUser(auth);
    });

    const Calendar = () => {
        return (
            <View>
                <ReactNativeCalendarStrip
                    onDateSelected={(date) => setSelectedDate(date)}
                    selectedDate={new Date()} // fecha inicial (?)
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
    };

    return (
        <View style={{ flex: 1 }}>
            <Header
                navigation={navigation}
                selectedDate={selectedDate}
            />
            {Calendar()}
            {/* <Divider width={1.5} /> */}
            <View style={{ flex: 1, flexDirection: "row" }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {}
                    <TaskItems
                        selectedDate={selectedDate}
                        navigation={navigation}
                    />
                </ScrollView>
                {/* <Icon icon="pluscircle" /> */}
            </View>
            {/* <View>
                <AddTaskButton
                    selectedDate={selectedDate}
                    navigation={navigation}
                />
            </View> */}
        </View>
    );
}

// const styles = StyleSheet.create({
//     addButton: {
//         // paddingHorizontal: 15,
//         position: "absolute",
//         bottom: 20,
//         right: 20,
//         alignSelf: "flex-end",
//         color: "red",
//     },
// });

const Icon = (props) => (
    <TouchableOpacity activeOpacity={0.5}>
        <AntDesign
            name={props.icon}
            light
            size={60}
            style={{
                // paddingHorizontal: 15,
                position: "absolute",
                bottom: 20,
                right: 20,
                alignSelf: "flex-end",
                color: "red",
            }}
        />
    </TouchableOpacity>
);

// function Calendar() {
//     return (
//         <View>
//             <ReactNativeCalendarStrip
//                 onDateSelected={(date) => (selectedDate = date)}
//                 scrollable
//                 daySelectionAnimation={{
//                     type: "background",
//                     highlightColor: "#F32F2F",
//                     // type: "border",
//                     // borderWidth: 1.5,
//                     // borderHighlightColor: "#F32F2F",
//                 }}
//                 style={{ height: 150, paddingTop: 20, paddingBottom: 10, marginBottom: 10 }}
//                 calendarHeaderStyle={{
//                     color: "#F32F2F",
//                     fontSize: 20,
//                     fontWeight: "700",
//                     marginBottom: 20,
//                 }}
//                 calendarColor={"#fff"}
//                 dateNumberStyle={{ color: "black" }}
//                 dateNameStyle={{ color: "black" }}
//                 highlightDateNumberStyle={{ color: "white" }}
//                 highlightDateNameStyle={{ color: "white" }}
//                 iconContainer={{ flex: 0.1 }}
//             />
//         </View>
//     );
//}
