import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const AlertHome = ({ title, message, buttons, cancelable }) => {
  return (
    <View style={styles.alertContainer}>
      <Text style={styles.alertTitle}>{title}</Text>
      <Text style={styles.alertMessage}>{message}</Text>
      {buttons.map((button, index) => (
        <View style={styles.button}>
          <Button key={index} title={button.text} onPress={button.onPress} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 5,
    elevation: 5,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  alertMessage: {
    fontSize: 16,
    marginBottom: 16,
  },
  /* button: {
    margin: 5,
  },
  */
});

export { AlertHome };
