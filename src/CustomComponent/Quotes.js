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
  "Der einzige Weg, um großartige Arbeit zu leisten, ist, das zu lieben, was du tust",
  "Gib niemals auf, große Dinge brauchen Zeit",
  "Erfolg ist die Summe kleiner Anstrengungen, die Tag für Tag wiederholt werden",
  "Vertraue darauf, dass das Universum die beste Entscheidung für dich trifft",
  "Sei die Veränderung, die du in der Welt sehen möchtest",
  "Träume nicht dein Leben, lebe deinen Traum",
  "Jeder Fortschritt beginnt mit dem Entschluss, es zu versuchen",
  "Das Leben ist zu kurz, um auf den perfekten Moment zu warten. Mach den Moment perfekt",
  "Die einzige Grenze für unsere Verwirklichung von morgen werden unsere Zweifel von heute sein",
  "Je härter du arbeitest, desto glücklicher bist du",
  "Verfolge deine Träume mit Leidenschaft und Entschlossenheit",
  "Jeder Erfolg beginnt mit dem Wunsch, es zu versuchen",
  "Glaube an deine unendlichen Möglichkeiten",
  "Mut ist der erste Schritt zum Erfolg",
  "Du bist der Architekt deiner eigenen Zukunft, mach was daraus!",
  "Verliere niemals aus den Augen, was wirklich wichtig ist",
  "Erfolg ist kein Zufall, sondern harte Arbeit, Beharrlichkeit und Liebe zu dem, was du tust",
];

export const motivationStyles = StyleSheet.create({
  motivationContainer: {
    width: wp(95),
    height: hp(15),

    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  motivationText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
