import React from 'react';
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { name: '5 Very happy', amount: 1 },
  { name: '4 Happy', amount: 2 },
  { name: '3 Neutral', amount: 3 },
  { name: '2 Sad', amount: 1 },
  { name: '1 Very sad', amount: 1 }
];
const COLORS = ['#00D530', '#C5CD10', '#FFDD00', '#EEAA08', '#F02222'];

export default function Analytic() {
  return (
    <View style={styles.container}>
      <Text>Analytic!</Text>
      <PieChart width={400} height={400} onMouseEnter={this.onPieEnter}>
        <Pie dataKey="amount" data={data} cx={200} cy={200} outerRadius={80}>
        {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <StatusBar style="auto" />
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