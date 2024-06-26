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
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import supabase from "../data/supabaseClient";
import { FontAwesome6 } from "@expo/vector-icons";

const Diary = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEmojiModalVisible, setEmojiModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [selectedTextSize, setSelectedTextSize] = useState(18);
  const [selectedTextStyle, setSelectedTextStyle] = useState("normal");
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const emojis = [
    { id: 1, emoji: "😄" },
    { id: 2, emoji: "😢" },
    { id: 3, emoji: "😡" },
    { id: 4, emoji: "😎" },
    { id: 5, emoji: "😐" },
    { id: 6, emoji: "😂" },
    { id: 7, emoji: "😍" },
    { id: 8, emoji: "😔" },
    { id: 9, emoji: "😴" },
    { id: 10, emoji: "😇" },
    { id: 11, emoji: "🥳" },
    { id: 12, emoji: "🤔" },
    { id: 13, emoji: "😭" },
    { id: 14, emoji: "😬" },
    { id: 15, emoji: "🤢" },
  ];

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
    const now = new Date().toISOString();
    const dateTimeToSave = selectedDate.includes("T")
      ? selectedDate
      : `${selectedDate}T${new Date().toISOString().split("T")[1]}`;

    const { data, error } = await supabase.from("entries").insert([
      {
        created_at: dateTimeToSave,
        comment: text,
        _photo_id: null,
        entry_type: "diary",
        title: title,
        mood: selectedEmoji
          ? emojis.find((e) => e.id === selectedEmoji).emoji
          : "😐",
      },
    ]);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Diary entry saved successfully");
      setTitle("");
      setText("");
      setSelectedEmoji(null);
    }
  };

  const handleSavePress = () => {
    saveEntry();
    navigation.goBack();
  };

  return (
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

      <Modal visible={isModalVisible} animationType="fade" transparent={true}>
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
            {selectedEmoji
              ? emojis.find((e) => e.id === selectedEmoji).emoji
              : "😐"}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isEmojiModalVisible}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.emojiModalContainer}>
          <View style={styles.emojiContainer}>
            {emojis.map((emojiObj) => (
              <TouchableOpacity
                key={emojiObj.id}
                onPress={() => {
                  setSelectedEmoji(emojiObj.id);
                  setEmojiModalVisible(false);
                }}
              >
                <Text style={styles.emojiText}>{emojiObj.emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
      <View
        style={{
          height: hp(55),
          margin: 5,
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

      <TouchableOpacity onPress={handleSavePress} style={styles.saveButton}>
        <FontAwesome6 name="add" size={24} color="black" />
      </TouchableOpacity>

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
    paddingTop: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  saveButton: {
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
  },
});
