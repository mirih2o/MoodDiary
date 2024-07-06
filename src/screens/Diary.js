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
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import supabase from "../data/supabaseClient";
import { FontAwesome6 } from "@expo/vector-icons";
import Toolbar from "../CustomComponent/Toolbar";
import EmojiModal from "../CustomComponent/EmojiModal";
import eventEmitter from "../data/EventEmitter";

const Diary = ({ route, navigation }) => {
  const { entry } = route.params || {};
  const [title, setTitle] = useState(entry?.title || "");
  const [text, setText] = useState(entry?.comment || "");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEmojiModalVisible, setEmojiModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    entry?.created_at || new Date().toISOString().split("T")[0]
  );
  const [selectedTextSize, setSelectedTextSize] = useState(18);
  const [selectedTextStyle, setSelectedTextStyle] = useState("normal");
  const [selectedEmoji, setSelectedEmoji] = useState(entry?.mood || "😐"); // Emoji aus dem Eintrag laden

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleEmojiModal = () => {
    setEmojiModalVisible(!isEmojiModalVisible);
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

  const saveEntry = async () => {
    const newEntry = {
      created_at: selectedDate,
      comment: text,
      _photo_id: null,
      entry_type: "diary",
      title: title,
      mood: selectedEmoji, // Emoji selbst speichern
    };

    let data, error;

    if (entry && entry._entry_id) {
      // Update existing entry
      ({ data, error } = await supabase
        .from("entries")
        .update(newEntry)
        .eq("_entry_id", entry._entry_id));
    } else {
      // Insert new entry
      newEntry.created_at = new Date().toISOString();
      ({ data, error } = await supabase.from("entries").insert([newEntry]));
    }

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Diary entry saved successfully");
      setTitle("");
      setText("");
      setSelectedEmoji("😐");
      eventEmitter.emit("entrySaved");
      navigation.navigate("Home");
    }
  };

  const handleSavePress = () => {
    saveEntry();
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/background.png")}
            style={styles.image}
          />
          <TouchableOpacity onPress={toggleModal} style={styles.date}>
            <Text style={{ fontSize: 22 }}>{formatDate(selectedDate)}</Text>
            <Ionicons
              name="caret-down"
              size={20}
              color="black"
              style={{ marginLeft: 6 }}
            />
          </TouchableOpacity>

          <Modal
            visible={isModalVisible}
            animationType="fade"
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.calendar}>
                <Calendar
                  style={{ height: hp(50), width: wp(90) }}
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
            </View>
          </Modal>

          <View style={styles.line} />
          <View style={styles.titleContainer}>
            <TextInput
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              style={[
                styles.titleInput,
                {
                  fontSize: selectedTextSize,
                  fontStyle: selectedTextStyle,
                  flex: 1,
                },
              ]}
            />
            <TouchableOpacity onPress={toggleEmojiModal} style={styles.emoji}>
              <Text style={styles.emojiText}>
                {selectedEmoji ? selectedEmoji : "😐"}
              </Text>
            </TouchableOpacity>
          </View>
          <EmojiModal
            isEmojiModalVisible={isEmojiModalVisible}
            toggleEmojiModal={toggleEmojiModal}
            setSelectedEmoji={setSelectedEmoji}
          />
          <View style={{ height: hp(55), margin: 5 }}>
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
          </View>

          <TouchableOpacity onPress={handleSavePress} style={styles.saveButton}>
            <FontAwesome6 name="add" size={24} color="black" />
          </TouchableOpacity>

          <Toolbar
            changeTextSize={changeTextSize}
            toggleTextStyle={toggleTextStyle}
            pickImage={pickImage}
            takePhoto={takePhoto}
            selectedTextSize={selectedTextSize}
            selectedTextStyle={selectedTextStyle}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Diary;

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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 15,
  },
  titleInput: {
    fontSize: 25,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  emoji: {
    marginLeft: 10,
  },
  emojiModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  emojiContainer: {
    width: wp(80),
    height: hp(25),
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  emojiText: {
    fontSize: 29,
    margin: 10,
  },
  textInput: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    padding: 10,
  },
  calendar: {
    paddingTop: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  saveButton: {
    position: "absolute",
    bottom: "15%",
    left: "80%",
    backgroundColor: "#5E5B70",
    borderRadius: 50,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
  },
});
