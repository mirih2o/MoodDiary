import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Text>Kalenderübersicht</Text>
      <StatusBar style="auto" />
      <Calendar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
