import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";

const Toolbar = ({
  changeTextSize,
  toggleTextStyle,
  pickImage,
  takePhoto,
  selectedTextSize,
  selectedTextStyle,
}) => {
  return (
    <View style={styles.toolbar}>
      <TouchableOpacity
        onPress={() => changeTextSize(selectedTextSize === 18 ? 22 : 18)}
      >
        <Text style={styles.toolbarIcon}>A</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          toggleTextStyle(selectedTextStyle === "normal" ? "italic" : "normal")
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
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#C4C1D6",
    paddingBottom: 40,
    paddingTop: 20,
  },
  toolbarIcon: {
    marginHorizontal: 10,
    fontSize: 25,
  },
});
