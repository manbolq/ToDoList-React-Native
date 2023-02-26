import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { TouchableOpacity } from "react-native";
import { db, firebase, auth } from "../../firebase";
import { getAuth } from "firebase/auth";
import { Modal } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import "../components/tasks/Header";
import * as tasks from "../screens/Tasks";

import { getDeviceLocale } from "react-native-device-info";
import moment from "moment";
import "moment/min/locales";

const deviceLocale = getDeviceLocale();
moment.locale(deviceLocale);

export default function AddTaskMenu({ navigation, route }) {
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [pickedTime, setPickedTime] = useState(null);
    const [changedTime, setChangedTime] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { task } = route.params;
    const [pickedDay, setPickedDay] = useState(new Date(route.params.selectedDate));

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setPickedTime(date);
        setChangedTime(true);
        hideTimePicker();
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        setPickedDay(date);
        hideDatePicker();
    };

    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            {/* Modal para confirmar si quiere borrar la hora */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            ¿Estás seguro de que quieres eliminar la hora agendada?
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => {
                                    setPickedTime(null);
                                    setChangedTime(true);
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
                                style={styles.modalButton}
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
            {/* resto del menu de añadir/editar tarea */}
            <Text style={styles.title}>{!task ? "Añade una nueva tarea" : "Edita la tarea"}</Text>
            <View
                style={{
                    flexDirection: "row",
                    width: "85%",
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}
            >
                <Text>🗓️ {pickedDay.toLocaleDateString()} </Text>
                <Text
                    onPress={() => setDatePickerVisibility(true)}
                    style={{ color: "#F26F6F", fontSize: 15 }}
                >
                    {" "}
                    Cambiar{" "}
                </Text>
            </View>
            <Formik
                initialValues={{ title: null, description: null }}
                onSubmit={(values) => {
                    task
                        ? addTaskToFireBase(
                              values,
                              navigation,
                              task,
                              pickedTime,
                              changedTime,
                              pickedDay
                          )
                        : values.title
                        ? values.title.trim()
                            ? addTaskToFireBase(
                                  values,
                                  navigation,
                                  task,
                                  pickedTime,
                                  changedTime,
                                  pickedDay
                              )
                            : null
                        : null;
                }}
            >
                {({ handleChange, handleSubmit, values }) => (
                    <View style={{ width: "85%" }}>
                        <TextInput
                            placeholder="Título de la tarea"
                            defaultValue={task ? task.title : null}
                            style={styles.input}
                            value={values.title}
                            onChangeText={handleChange("title")}
                        />
                        <TextInput
                            placeholder="Descripción de la tarea (opcional)"
                            defaultValue={task ? task.description : null}
                            multiline
                            style={styles.input}
                            value={values.description}
                            onChangeText={handleChange("description")}
                        />

                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <TouchableOpacity
                                onPress={showTimePicker}
                                style={
                                    task && task.pickedTime ? styles.smallButton : styles.bigButton
                                }
                            >
                                <Text
                                    style={{ alignSelf: "center", fontSize: 20, fontWeight: "700" }}
                                >
                                    {task && task.pickedTime
                                        ? "Editar hora"
                                        : "Elegir hora (opcional)"}
                                </Text>
                            </TouchableOpacity>
                            {task && task.pickedTime ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowModal(true);
                                    }}
                                    style={styles.smallButton}
                                >
                                    <Text
                                        style={{
                                            alignSelf: "center",
                                            fontSize: 20,
                                            fontWeight: "700",
                                        }}
                                    >
                                        Eliminar hora
                                    </Text>
                                </TouchableOpacity>
                            ) : null}
                        </View>

                        <TouchableOpacity
                            onPress={handleSubmit}
                            style={[styles.button, { marginTop: 70 }]}
                        >
                            <Text style={{ alignSelf: "center", fontSize: 20, fontWeight: "700" }}>
                                {!task ? "Añadir" : "Confirmar"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Tasks")}
                            style={styles.button}
                        >
                            <Text style={{ alignSelf: "center", fontSize: 20, fontWeight: "700" }}>
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>

            {/* time picker ahora */}
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                is24Hour={true}
                // positiveButton={{ label: "Añadir", textColor: "red" }}
                onConfirm={handleConfirm}
                onCancel={hideTimePicker}
            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                date={pickedDay}
                mode="date"
                // display="compact"
                // display="spinner"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#F26F6F",
        borderRadius: 20,
        marginTop: 15,
        height: 40,
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#BD4444",
    },
    bigButton: {
        backgroundColor: "#F26F6F",
        borderRadius: 20,
        marginTop: 15,
        height: 40,
        width: "100%",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#BD4444",
    },
    smallButton: {
        backgroundColor: "#F26F6F",
        borderRadius: 20,
        marginTop: 5,
        marginBottom: 20,
        height: 40,
        width: "48%",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#BD4444",
    },
    errorMessage: {
        color: "red",
    },
    input: {
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 15,
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
    },
    title: {
        margin: 15,
        fontSize: 35,
        fontWeight: "800",
        alignSelf: "center",
        textAlign: "center",
    },
    modalText: {
        fontSize: 17,
        marginBottom: 15,
        textAlign: "center",
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
    modalButton: {
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
});

const addTaskToFireBase = (values, navigation, task, pickedTime, changedTime, pickedDay) => {
    let splittedSelectedDate = pickedDay.toString().split(" ");
    console.log(splittedSelectedDate);

    !task
        ? db.collection("tasks").add({
              uid: getAuth().currentUser.uid,
              title: values.title.trim(),
              description: values.description ? values.description.trim() : null,
              isChecked: false,
              pickedTime: changedTime ? pickedTime.toTimeString().substring(0, 5) : null,
              year: splittedSelectedDate[3],
              month: splittedSelectedDate[1],
              day: splittedSelectedDate[2],
              hour: new Date().toString().split(" ")[4],
          })
        : db
              .collection("tasks")
              .doc(task.id)
              .update({
                  title: values.title ? values.title : task.title,
                  description: values.description ? values.description : task.description,
                  pickedTime: changedTime
                      ? pickedTime
                          ? pickedTime.toTimeString().substring(0, 5)
                          : null
                      : task.pickedTime,
              });

    navigation.navigate("Tasks");
};
