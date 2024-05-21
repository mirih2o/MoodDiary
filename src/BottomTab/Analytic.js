import React from 'react';
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { PieChart, Pie, Cell, Tooltip, Legend, ScatterChart, Scatter, CartesianGrid, XAxis, YAxis } from 'recharts';

// test data
const data = [
  { name: '5 Very happy', amount: 1 },
  { name: '4 Happy', amount: 2 },
  { name: '3 Neutral', amount: 2 },
  { name: '2 Sad', amount: 1 },
  { name: '1 Very sad', amount: 1 }
];
const COLORS = ['#00D530', '#C5CD10', '#FFDD00', '#EEAA08', '#F02222'];

const data2 = [
  { name: 3, day: 'Mo' },
  { name: 1, day: 'Di' },
  { name: 3, day: 'Mi' },
  { name: 2, day: 'Do' },
  { name: 4, day: 'Fr' },
  { name: 5, day: 'Sa' },
  { name: 4, day: 'So' }
];

const total = data2.reduce((sum, item) => sum + item.name, 0);
const average = total / data2.length;
const average_rounded = Math.round(average * 10) / 10;

export default function Analytic() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Analytic!</Text>
      <ScrollView>
        <ScatterChart width={400} height={400} onMouseEnter={this.onPieEnter}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" type="category" name="Day" />
          <YAxis dataKey="name" type="number" name="Mood" domain={[1, 5]} interval="preserveStartEnd" padding={{ top: 30, bottom: 30 }} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="moods" data={data2} fill="#8884d8" />
        </ScatterChart>

        <PieChart width={400} height={400} onMouseEnter={this.onPieEnter}>
          <Pie dataKey="amount" data={data} cx={200} cy={200} outerRadius={80}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" />
        </PieChart>
        <Text style={styles.centered}>Average: {average_rounded}</Text>
      </ScrollView>
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
  centered: {
    // component horizontally centered, vertically below former component
    textAlign: "center",
    margin: "auto",
  }
});