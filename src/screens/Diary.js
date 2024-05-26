import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Calendar } from "react-native-calendars";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Diary = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  // const [selectedDate, setSelectedDate] = useState(new Date());
  //const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  /*const handleConfirm = (date) => {
    setSelectedDate(date);
    setDatePickerVisibility(false);
    setModalVisible(false);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  */

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    // setDatePickerVisibility(true);
  };
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setModalVisible(false);
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    const months = [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ];
    return `${day}. ${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} style={styles.date}>
        <Text style={{ fontSize: 22 }}>{formatDate(selectedDate)}</Text>
        {/*selectedDate.toDateString() */}
        <Ionicons
          name="caret-down"
          size={20}
          color="black"
          style={{ marginLeft: 5 }}
        />
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="fade" transparent={true}>
        <TouchableOpacity style={{ flex: 1 }} onPress={toggleModal}>
          {/* <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          */}
          <View>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  marked: true,
                  selectedColor: "#C4C1D6",
                },
              }}
              theme={{
                textSectionTitleColor: "#C4C1D6",
                selectedDayBackgroundColor: "#C4C1D6",
                selectedDayTextColor: "black",
                todayTextColor: "#dbaaee",
                dayTextColor: "#2d4150",
                textDisabledColor: "#d9e1e8",
                dotColor: "#dbaaee",
                selectedDotColor: "#C4C1D6",
                arrowColor: "#C4C1D6",
                monthTextColor: "black",
                indicatorColor: "#dbaaee",
                textDayFontFamily: "monospace",
                textMonthFontFamily: "monospace",
                textDayHeaderFontFamily: "monospace",
                textDayFontWeight: "300",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "300",
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      <View style={styles.line} />
      <TextInput
        placeholder="Titel"
        value={title}
        onChangeText={setTitle}
        style={styles.titleInput}
      />
      <View
        style={{
          height: hp(55),
          margin: 20,
          alignItems: "center",
        }}
      >
        <ScrollView>
          <TextInput
            placeholder="Write your dream here..."
            value={text}
            onChangeText={setText}
            style={styles.textInput}
            multiline={true}
            textAlignVertical="top"
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9d99bc",
  },

  date: {
    flexDirection: "row",
    margin: 25,
  },

  line: {
    height: 1,
    backgroundColor: "grey",
    marginHorizontal: 15,
    alignItems: "center",
    elevation: 30,
  },

  titleInput: {
    margin: 15,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  textInput: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    padding: 10,
  },
});

export default Diary;
