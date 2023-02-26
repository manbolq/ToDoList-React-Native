import React, { useEffect, useState } from "react";
import { ImageBackground, Pressable, TouchableOpacity } from "react-native";
import { ScrollView, StyleSheet, Text, View, Modal } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Divider } from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";

export default function TaskItems({ selectedDate, navigation }) {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [docID, setDocID] = useState(null);

    let splittedSelectedDate = selectedDate.toString().split(" ");

    useEffect(() => {
        const loadData = async () => {
            const tasksRef = db
                .collection("tasks")
                .where("uid", "==", getAuth().currentUser.uid)
                .where("year", "==", splittedSelectedDate[3])
                .where("month", "==", splittedSelectedDate[1])
                .where("day", "==", splittedSelectedDate[2])
                .orderBy("hour");
            tasksRef.onSnapshot((querySnapshot) => {
                const tasksAux = [];
                querySnapshot.forEach((doc) => {
                    const { title, description, isChecked, pickedTime } = doc.data();
                    tasksAux.push({
                        id: doc.id,
                        title,
                        description,
                        isChecked,
                        pickedTime,
                    });
                });
                setTasks(tasksAux);
                console.log(tasks);
            });
        };
        loadData();

        return setTasks([]);
    }, [selectedDate]);

    return (
        <View>
            {/* Modal para el menu de confirmar borrar tarea */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            ¿Estás seguro de que quieres borrar la tarea?
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    db.collection("tasks").doc(docID).delete();
                                    setDocID(null);
                                    setShowModal(false);
                                }}
                            >
                                <Text
                                    style={{ alignSelf: "center", fontSize: 20, fontWeight: "700" }}
                                >
                                    Sí
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    setShowModal(false);
                                }}
                            >
                                <Text
                                    style={{ alignSelf: "center", fontSize: 20, fontWeight: "700" }}
                                >
                                    No
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {tasks.map((task, index) => (
                <View key={index}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Item
                            key={index}
                            task={task}
                        />
                        <View
                            style={{
                                flexDirection: "row",
                                position: "absolute",
                                right: 20,
                            }}
                        >
                            <Icon
                                icon="edit"
                                onPress={() => {
                                    navigation.navigate("AddTaskMenu", { task: task });
                                }}
                            />
                            <Icon
                                icon="trash"
                                onPress={() => {
                                    setDocID(task.id);
                                    setShowModal(true);
                                }}
                            />
                        </View>
                    </View>
                    <Divider
                        width={1}
                        style={{ width: "90%", alignSelf: "center" }}
                    />
                </View>
            ))}
        </View>
    );
}

const Item = (props) => {
    return (
        <View style={{ flex: 1, marginRight: 140 }}>
            <BouncyCheckbox
                isChecked={props.task.isChecked}
                // change isChecked in the DB (false --> true, true --> false)
                onPress={() =>
                    db
                        .collection("tasks")
                        .doc(props.task.id)
                        .update({ isChecked: !props.task.isChecked })
                }
                style={{ marginLeft: 20, marginTop: 10, marginRight: 10 }}
                size={20}
                fillColor="#F32F2F"
                text={props.task.title}
                textStyle={styles.title}
            />
            <Text style={styles.description}>{props.task.description}</Text>
            {props.task.pickedTime ? (
                <Text style={styles.description}>⏰ {props.task.pickedTime}</Text>
            ) : null}
        </View>
    );
};

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
                color: "#000",
            }}
        />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    title: {
        color: "#000",
        fontSize: 25,
        fontWeight: "700",
    },
    description: {
        fontSize: 16,
        fontWeight: "40",
        marginLeft: 57,
        marginRight: 10,
        paddingBottom: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        backgroundColor: "#F26F6F",
        borderRadius: 20,
        marginTop: 15,
        marginHorizontal: 10,
        height: 40,
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#BD4444",
        width: "30%",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        fontSize: 17,
        marginBottom: 15,
        textAlign: "center",
    },
});
