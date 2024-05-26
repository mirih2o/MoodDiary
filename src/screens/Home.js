import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { quotes, motivationStyles } from "../CustomComponent/Quotes";

const Home = ({ navigation }) => {
  const [motivationQuote, setMotivationQuote] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setMotivationQuote(quotes[randomIndex]);
  }, []);

  const handlePress = () => {
    const buttons = [
      { text: "Diary", onPress: () => navigation.navigate("Diary") },
      { text: "Dream", onPress: () => navigation.navigate("Dream") },
    ];
    Alert.alert(
      "Choose an entry type",
      "Do you want to create a diary entry or a dream entry?",
      buttons,
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/background.png")}
        style={styles.image}
      />
      <View style={motivationStyles.motivationContainer}>
        <Text style={motivationStyles.motivationText}>{motivationQuote}</Text>
      </View>

      {/*Columns */}

      <View style={styles.columnsContainer}>
        <ScrollView>
          <View style={styles.columns}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 35, marginRight: 10 }}>07</Text>
              <Text style={{ marginTop: 17, fontSize: 18 }}>Mai</Text>
            </View>

            <Text style={{ padding: 15 }}>Tagebucheintrag...</Text>
          </View>

          <View style={styles.columns}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 35, marginRight: 10 }}>07</Text>
              <Text style={{ marginTop: 17, fontSize: 18 }}>Mai</Text>
            </View>

            <Text style={{ padding: 15 }}>Tagebucheintrag...</Text>
          </View>
          <View style={styles.columns}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 35, marginRight: 10 }}>07</Text>
              <Text style={{ marginTop: 17, fontSize: 18 }}>Mai</Text>
            </View>

            <Text style={{ padding: 15 }}>Tagebucheintrag...</Text>
          </View>
          <View style={styles.columns}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 35, marginRight: 10 }}>07</Text>
              <Text style={{ marginTop: 17, fontSize: 18 }}>Mai</Text>
            </View>

            <Text style={{ padding: 15 }}>Tagebucheintrag...</Text>
          </View>
          <View style={styles.columns}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 35, marginRight: 10 }}>07</Text>
              <Text style={{ marginTop: 17, fontSize: 18 }}>Mai</Text>
            </View>

            <Text style={{ padding: 15 }}>Tagebucheintrag...</Text>
          </View>
          <View style={styles.columns}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 35, marginRight: 10 }}>07</Text>
              <Text style={{ marginTop: 17, fontSize: 18 }}>Mai</Text>
            </View>

            <Text style={{ padding: 15 }}>Tagebucheintrag...</Text>
          </View>
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handlePress}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9d99bc",
    flexDirection: "column",
    alignItems: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 160,
    left: 160,
    backgroundColor: "#5E5B70",
    borderRadius: 50,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    position: "absolute",
    width: wp(100),
    height: hp(100),
    opacity: 0.2,
  },
  columnsContainer: {
    width: wp(95),
    height: hp(55),
    marginTop: 200,
  },
  columns: {
    width: wp(95),
    height: hp(15),
    paddingHorizontal: 20,
    backgroundColor: "#C4C1D6",
    borderRadius: 10,
    marginBottom: 10,
  },
});
