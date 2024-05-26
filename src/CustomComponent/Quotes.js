import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const quotes = [
  "Glaube an dich selbst. Du bist stärker, als du denkst",
  "Jeder Tag ist eine neue Chance, etwas zu erreichen",
  "Hindernisse sind nur Tests auf dem Weg zum Erfolg",
];

export const motivationStyles = StyleSheet.create({
  motivationContainer: {
    position: "absolute",
    top: 40,
    width: wp(95),
    height: hp(15),
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  motivationText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
