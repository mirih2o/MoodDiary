import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { quotes, motivationStyles } from "../CustomComponent/Quotes";
import supabase from "../data/supabaseClient";
import { Swipeable } from "react-native-gesture-handler";
import eventEmitter from "../data/EventEmitter";

const Home = ({ navigation }) => {
  const [motivationQuote, setMotivationQuote] = useState("");
  const [entries, setEntries] = useState([]);
  const [entryType, setEntryType] = useState("diary");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setMotivationQuote(quotes[randomIndex]);
    fetchEntries();
  }, [entryType]);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .eq("entry_type", entryType)
      .order("created_at", { ascending: false });
    if (error) {
      console.error(error);
    } else {
      setEntries(data);
    }
  };

  useEffect(() => {
    const handleEntrySaved = () => {
      fetchEntries();
    };

    eventEmitter.on("entrySaved", handleEntrySaved);

    return () => {
      eventEmitter.off("entrySaved", handleEntrySaved);
    };
  }, [entryType]);

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

  const deleteEntry = async (id) => {
    const { error } = await supabase
      .from("entries")
      .delete()
      .eq("_entry_id", id);
    if (error) {
      console.error(error);
    } else {
      setEntries(entries.filter((entry) => entry._entry_id !== id));
    }
  };

  const renderRightActions = (entry) => (
    <View style={styles.rightAction}>
      <TouchableOpacity onPress={() => deleteEntry(entry._entry_id)}>
        <FontAwesome name="trash" size={29} color="red" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Diary", { entry })}
        style={{ marginLeft: 20 }}
      >
        <FontAwesome name="edit" size={29} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/background.png")}
        style={styles.image}
      />
      <View style={motivationStyles.motivationContainer}>
        <Text style={motivationStyles.motivationText}>{motivationQuote}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, entryType === "diary" && styles.activeButton]}
          onPress={() => setEntryType("diary")}
        >
          <Text style={styles.buttonText}>Diary</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, entryType === "dream" && styles.activeButton]}
          onPress={() => setEntryType("dream")}
        >
          <Text style={styles.buttonText}>Dream</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {entries.map((entry) => (
          <Swipeable
            key={entry._entry_id}
            renderRightActions={() => renderRightActions(entry)}
          >
            <View style={styles.columns}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 35, marginRight: 10 }}>
                    {new Date(entry.created_at).getDate()}
                  </Text>
                  <Text style={{ marginTop: 17, fontSize: 18 }}>
                    {new Date(entry.created_at).toLocaleString("default", {
                      month: "long",
                    })}
                  </Text>
                </View>
                <Text style={{ fontSize: 35 }}>{entry.mood}</Text>
              </View>
              <Text
                style={styles.entryText}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {entry.comment}
              </Text>
            </View>
          </Swipeable>
        ))}
      </ScrollView>

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
  columns: {
    width: wp(95),
    height: "auto",
    paddingHorizontal: 20,
    backgroundColor: "#C4C1D6",
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 10,
  },
  rightAction: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: "#5E5B70",
    borderRadius: 5,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#3B3A50",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  entryText: {
    padding: 15,
    fontSize: 16,
  },
});
