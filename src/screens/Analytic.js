import React from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
{/*import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";*/}
import { LineChart, PieChart } from "react-native-gifted-charts";
import {LinearGradient, Stop} from 'react-native-svg';

// test data
const data = [
  { name: "5 Very happy", amount: 1 },
  { name: "4 Happy", amount: 2 },
  { name: "3 Neutral", amount: 2 },
  { name: "2 Sad", amount: 1 },
  { name: "1 Very sad", amount: 1 },
];
const COLORS = ["#288f68", "#94b86d", "#f7db88", "#f08f55", "#d93452"];

const data2 = [
  { name: 3, day: "Mo" },
  { name: 1, day: "Di" },
  { name: 3, day: "Mi" },
  { name: 2, day: "Do" },
  { name: 4, day: "Fr" },
  { name: 5, day: "Sa" },
  { name: 4, day: "So" },
];

const total = data2.reduce((sum, item) => sum + item.name, 0);
const average = total / data2.length;
const average_rounded = Math.round(average * 10) / 10;

const commonStripStyle = {position: 'absolute', width: '100%', height: 32};
const renderBackgroundStrips = () => (
  <>
    <View
      style={{
        ...commonStripStyle,
        backgroundColor: COLORS[0],
      }}
    />
    <View
      style={{
        ...commonStripStyle,
        top: 32,
        backgroundColor: COLORS[1],
      }}
    />
    <View
      style={{
        ...commonStripStyle,
        top: 64,
        backgroundColor: COLORS[2],
      }}
    />
    <View
      style={{
        ...commonStripStyle,
        //height: 60,
        top: 96,
        backgroundColor: COLORS[3],
      }}
    />
    <View
      style={{
        ...commonStripStyle,
        height: 32,
        top: 128,
        backgroundColor: COLORS[4],
      }}
    />
  </>
);

export default function Analytic() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text>Mood Analytics</Text>
      <ScrollView>
      {renderBackgroundStrips()}
        <LineChart
          data={data2.map((entry, index) => ({
            day: entry.day,
            value: entry.name,
            color: COLORS[index % COLORS.length],
          }))}
          maxValue={5}
          noOfSections={5}
          stepValue={1}
          hideRules
          initialSpacing={10}
          dataPointsRadius={4}
          dataPointsColor="black"
          strokeDashArray={[4, 4]}
          showDataPointsForMissingValues={false}
          dataPoints
          hideOrigin
          height={160}
          yAxisExtraHeight={16}
          thickness={1}
          xAxisColor="white"  
          yAxisColor="white"
          yAxisThickness={1.5}
        />

        <PieChart
          data={data.map((entry, index) => ({
            name: entry.name,
            value: entry.amount,
            color: COLORS[index % COLORS.length],
          }))}

          showText
          textColor="black"
          radius={150}
          textSize={20}
          focusOnPress
          showValuesAsLabels
          showTextBackground
          textBackgroundRadius={20}
          strokeColor="white"
          strokeWidth={1.5}
        />

        {/*
        <ScatterChart width={400} height={400} onMouseEnter={this.onPieEnter}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" type="category" name="Day" />
          <YAxis
            dataKey="name"
            type="number"
            name="Mood"
            domain={[1, 5]}
            interval="preserveStartEnd"
            padding={{ top: 30, bottom: 30 }}
          />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="moods" data={data2} fill="#8884d8">
            {data2.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                // make sure to use the same color for the same mood
                // name 1 is very sad, name 5 is very happy
                // order of COLORS is reversed
                fill={COLORS[5 - entry.name]}
              />
            ))}
          </Scatter>
        </ScatterChart>

        <PieChart width={400} height={300} onMouseEnter={this.onPieEnter}>
          <Pie dataKey="amount" data={data} cx={200} cy={100} outerRadius={85}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                // make sure to use the same color for the same mood
                // name 1 is very sad, name 5 is very happy
                // order of COLORS matches the order of the data
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" />
        </PieChart>
        */}
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
  },
});
