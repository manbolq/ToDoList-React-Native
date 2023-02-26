import React, { useState } from "react";
import { Button, Platform, View, Text } from "react-native";
// import DateTimePicker from "react-native-modal-datetime-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import TimePicker from "react-time-picker";
import RNDateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import es from "moment/locale/es";

export default function Testing() {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

    return (
        <View>
            <Button
                title="Show Date Picker"
                onPress={showDatePicker}
            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                is24Hour={true}
                positiveButton={{ label: "Añadir", textColor: "red" }}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
}
