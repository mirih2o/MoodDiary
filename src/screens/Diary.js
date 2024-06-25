import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Calendar } from "react-native-calendars";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";

const Diary = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [selectedTextSize, setSelectedTextSize] = useState(18);
  const [selectedTextStyle, setSelectedTextStyle] = useState("normal");
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result.uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.uri);
    }
  };

  const toggleTextStyle = (style) => {
    setSelectedTextStyle(style);
  };

  const changeTextSize = (size) => {
    setSelectedTextSize(size);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/background.png")}
        style={styles.image}
      />
      <TouchableOpacity onPress={toggleModal} style={styles.date}>
        <Text style={{ fontSize: 22 }}>{formatDate(selectedDate)}</Text>
        {/*selectedDate.toDateString() */}
        <Ionicons
          name="caret-down"
          size={20}
          color="black"
          style={{ marginLeft: 6 }}
        />
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="fade" transparent={true}>
        {/* <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          */}
        <View style={styles.calendar}>
          <Calendar
            style={{ height: hp(45) }}
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
              todayTextColor: "#C4C1D6",
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
      </Modal>

      <View style={styles.line} />
      <TextInput
        placeholder="Titel"
        value={title}
        onChangeText={setTitle}
        style={[
          styles.titleInput,
          { fontSize: selectedTextSize, fontStyle: selectedTextStyle },
        ]}
      />
      <View
        style={{
          height: hp(55),
          margin: 20,
        }}
      >
        <ScrollView>
          <TextInput
            placeholder="Write your dream here..."
            value={text}
            onChangeText={setText}
            style={[
              styles.textInput,
              { fontSize: selectedTextSize, fontStyle: selectedTextStyle },
            ]}
            multiline={true}
            textAlignVertical="top"
          />
        </ScrollView>
      </View>

      <View style={styles.toolbar}>
        <TouchableOpacity
          onPress={() => changeTextSize(selectedTextSize === 18 ? 22 : 18)}
        >
          <Text style={styles.toolbarIcon}>A</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            toggleTextStyle(
              selectedTextStyle === "normal" ? "italic" : "normal"
            )
          }
        >
          <FontAwesome
            name="italic"
            size={24}
            color="black"
            style={styles.toolbarIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            toggleTextStyle(selectedTextStyle === "normal" ? "bold" : "normal")
          }
        >
          <FontAwesome
            name="bold"
            size={24}
            color="black"
            style={styles.toolbarIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage}>
          <Entypo
            name="image"
            size={24}
            color="black"
            style={styles.toolbarIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={takePhoto}>
          <Ionicons
            name="camera"
            size={24}
            color="black"
            style={styles.toolbarIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9d99bc",
  },
  image: {
    position: "absolute",
    width: wp(100),
    height: hp(100),
    opacity: 0.2,
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
    fontSize: 25,
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

  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#C4C1D6",
    padding: 10,
  },
  toolbarIcon: {
    marginHorizontal: 10,
    fontSize: 25,
  },
  calendar: {
    margin: 10,
    paddingTop: 150,
  },
});

export default Diary;
