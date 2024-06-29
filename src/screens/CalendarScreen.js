import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, ImageBackground } from "react-native";
import { Calendar } from "react-native-calendars";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import supabase from "../data/supabaseClient";

const CalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const calendarSelectedColor = "#9d99bc";

  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from("entries")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error(error);
      } else {
        setEntries(data);
      }
    };

    const subscription = supabase
      .channel("public:entries")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "entries" },
        (payload) => {
          setEntries((prevEntries) => [payload.new, ...prevEntries]);
        }
      )
      .subscribe();

    fetchEntries();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const filtered = entries.filter(
        (entry) => entry.created_at.split("T")[0] === selectedDate
      );
      setFilteredEntries(filtered);
    } else {
      setFilteredEntries([]); // Reset filtered entries when no date is selected
    }
  }, [selectedDate, entries]);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    const selectedDay = { [day.dateString]: { selected: true, selectedColor: calendarSelectedColor } };
    setMarkedDates(selectedDay);
  };

  const handleEntryPress = (entry) => {
    setSelectedEntry(entry);
    setModalVisible(true);
  };

  const truncateText = (text, maxLines) => {
    const words = text.split(' ');
    let truncatedText = words.slice(0, maxLines * 10).join(' ');
    if (truncatedText.length < text.length) {
      truncatedText += '...';
    }
    return truncatedText;
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Ionicons name="arrow-back" color="black" size={25} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Kalender</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.calendarBox}>
              <Calendar
                onDayPress={onDayPress}
                style={styles.calendar}
                theme={calendarTheme}
                markedDates={markedDates}
              />
            </View>

            {selectedDate ? (
              <View style={styles.entriesContainer}>
                <Text style={styles.selectedDateText}>Datum: {selectedDate}</Text>
                {filteredEntries.length === 0 ? (
                  <Text style={styles.noEntriesText}>Keine Einträge</Text>
                ) : (
                  filteredEntries.map((entry) => (
                    <TouchableOpacity key={entry.id} onPress={() => handleEntryPress(entry)} style={styles.entry}>
                      <Text style={styles.entryText}>Stimmung: {entry.mood}</Text>
                      <Text numberOfLines={2} style={styles.entryText}>
                        {truncateText(entry.comment, 2)}
                      </Text>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            ) : null}
          </View>

          {selectedEntry && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalView}>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Ionicons name="close-circle-outline" size={36} color="#5E5B70" />
                </TouchableOpacity>
                <ScrollView contentContainerStyle={styles.modalContent}>
                  <Text style={styles.modalText}>Stimmung: {selectedEntry.mood}</Text>
                  <Text style={styles.modalText}>Kommentare: {selectedEntry.comment}</Text>
                </ScrollView>
              </View>
            </Modal>
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default CalendarScreen;

const calendarTheme = {
  backgroundColor: "transparent",
  calendarBackground: "transparent",
  textSectionTitleColor: "#b6c1cd",
  textSectionTitleDisabledColor: "#d9e1e8",
  selectedDayBackgroundColor: "#ffffff",
  selectedDayTextColor: "#2d4150",
  todayTextColor: "#00adf5",
  dayTextColor: "#2d4150",
  textDisabledColor: "#d9e1e8",
  dotColor: "#00adf5",
  selectedDotColor: "#ffffff",
  arrowColor: "#2d4150",
  disabledArrowColor: "#d9e1e8",
  monthTextColor: "#2d4150",
  indicatorColor: "#00adf5",
  textDayFontFamily: "Roboto",
  textMonthFontFamily: "Roboto",
  textDayHeaderFontFamily: "Roboto",
  textDayFontWeight: "300",
  textMonthFontWeight: "bold",
  textDayHeaderFontWeight: "300",
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 16
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9d99bc",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  backgroundImageStyle: {
    opacity: 0.5,
  },
  header: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: heightPercentageToDP(10.5),
    paddingTop: 15,
    paddingLeft: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2d4150",
    marginLeft: 15,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
  },
  contentContainer: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 10,
  },
  calendarBox: {
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calendar: {
    marginBottom: 10,
  },
  entriesContainer: {
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2d4150",
    marginTop: 10,
    textAlign: "center",
  },
  noEntriesText: {
    fontSize: 16,
    color: "#808080",
    textAlign: "center",
    marginTop: 20,
  },
  entry: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  entryText: {
    fontSize: 16,
    color: "#2d4150",
    marginBottom: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
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
  modalContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },
  modalText: {
    marginBottom: 10,
    fontSize: 18,
    color: "#2d4150",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 20,
    zIndex: 1,
  },
});
