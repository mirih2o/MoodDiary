import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Modal, Button, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CalendarScreen({navigation}) {
  const [selectedDate, setSelectedDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [moodData, setMoodData] = useState({

  });

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="arrow-back" color="black" size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Kalender</Text>
      </View>

    
      <StatusBar style="auto" />
      <Calendar onDayPress={onDayPress} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text>Datum: {selectedDate}</Text>
          <Text>
            Stimmung: {moodData[selectedDate]?.mood || "Keine Einträge"}
          </Text>
          <Text>
            Kommentare: {moodData[selectedDate]?.comments || "Keine Kommentare"}
          </Text>
          <Button
            onPress={() => setModalVisible(false)}
            title="Schließen"
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
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
  header: {
    backgroundColor: "white",
  
   
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: heightPercentageToDP(10.5),
    paddingTop: 15,
    paddingStart: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'ultralight',
    color: "black",
    marginLeft: 25,
  },
});
