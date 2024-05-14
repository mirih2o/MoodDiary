import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Alert } from "react-native";
import { AlertHome } from "../CustomComponent/AlertHome";

const Stack = createStackNavigator();

const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  /* const handlePress = () => {
    const buttons = [
      { text: "Diary", onPress: () => navigation.navigate("Diary") },
      { text: "Dream", onPress: () => navigation.navigate("Dream") },
    ];
    AlertHome.alert(
      "Choose an entry type",
      "Do you want to create a diary entry or a dream entry?",
      buttons,
      { cancelable: true }
    );
  };
  */
  const handleTouchStart = (event) => {
    if (modalVisible && event.nativeEvent.target === event.currentTarget) {
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container} onTouchStart={handleTouchStart}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <AlertHome
          title="Choose an entry type"
          message="Do you want to create a diary entry or a dream entry?"
          buttons={[
            {
              text: "Diary",
              onPress: () => {
                setModalVisible(false);
                navigation.navigate("Diary");
              },
            },
            {
              text: "Dream",
              onPress: () => {
                setModalVisible(false);
                navigation.navigate("Dream");
              },
            },
          ]}
          cancelable={true}
        />
      </Modal>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 160,
    left: 160,
    backgroundColor: "#4CAF50",
    borderRadius: 50,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  alertContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 5,
    elevation: 5,
  },
});
