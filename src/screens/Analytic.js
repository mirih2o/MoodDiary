import React, { useState, useEffect } from 'react';
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import { LineChart, PieChart } from "react-native-gifted-charts";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import supabase from '../data/supabaseClient';

// mood values: 1 - 5
const COLORS = ["#d93452", "#f08f55", "#f7db88", "#94b86d", "#288f68"];

const commonStripStyle = { position: 'absolute', width: '100%', height: 32 };

const renderBackgroundStrips = () => (
  <>
    <View style={{ ...commonStripStyle, backgroundColor: COLORS[4] }} />
    <View style={{ ...commonStripStyle, top: 32, backgroundColor: COLORS[3] }} />
    <View style={{ ...commonStripStyle, top: 64, backgroundColor: COLORS[2] }} />
    <View style={{ ...commonStripStyle, top: 96, backgroundColor: COLORS[1] }} />
    <View style={{ ...commonStripStyle, height: 32, top: 128, backgroundColor: COLORS[0] }} />
  </>
);

const date7DaysAgo = new Date();
date7DaysAgo.setUTCDate(date7DaysAgo.getUTCDate() - 7);
const formattedDate = date7DaysAgo.toISOString().replace('T', ' ').slice(0, 19);

const renderLegend = (text, color) => {
  return (
    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
      <View
        style={{
          height: 18,
          width: 18,
          marginRight: 10,
          borderRadius: 4,
          backgroundColor: color || 'white',
        }}
      />
      <Text>{text || ''}</Text>
    </View>
  );
};

const Analytic = ({ navigation }) => {
  const [entries, setEntries] = useState([]);
  const [emojis, setEmojis] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: entriesData, error: entriesError } = await supabase
          .from('entries')
          .select('created_at, mood')
          .gte('created_at', formattedDate)
          .order("created_at", { ascending: true });

        if (entriesError) throw new Error(entriesError.message);
        setEntries(entriesData);

        const { data: emojisData, error: emojisError } = await supabase
          .from('emojis')
          .select('id, emoji, value');

        if (emojisError) throw new Error(emojisError.message);
        setEmojis(emojisData);

      } catch (error) {
        console.error("Error during fetch:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

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

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const emojiToValue = (emoji) => {
    const emojiObj = emojis.find(e => e.emoji === emoji);
    return emojiObj ? emojiObj.value : 3;
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    return date.toISOString().split("T")[0];
  }).reverse();

  const weeklyData = days.map((day) => {
    const dayEntries = entries.filter(
      (entry) => entry.created_at.split("T")[0] === day
    );
    const averageMood = dayEntries.length > 0
      ? (dayEntries.reduce((sum, entry) => sum + emojiToValue(entry.mood), 0) / dayEntries.length).toFixed(2)
      : null;
    return { day: new Date(day).toLocaleDateString('de-DE', { weekday: 'short' }), value: averageMood };
  });

  const pieDataByValue = entries.reduce((acc, { mood }) => {
    const moodValue = emojiToValue(mood);
    const moodItem = acc.find(item => item.name === moodValue);
    if (moodItem) {
      moodItem.amount += 1;
    } else {
      acc.push({ name: moodValue, amount: 1 });
    }
    return acc;
  }, []).map((entry, index) => ({
    ...entry,
    color: COLORS[entry.name - 1],
    value: entry.amount,
    text: `${entry.amount}x`
  }));

  const pieDataByEmoji = emojis.map((emojiObj) => {
    const amount = entries.filter(entry => entry.mood === emojiObj.emoji).length;
    return {
      name: emojiObj.emoji,
      value: amount,
      text: `${emojiObj.emoji + amount}x`,
      color: COLORS[emojiToValue(emojiObj.emoji) - 1],
    };
  });

  const total = weeklyData.reduce((sum, { value }) => sum + (value !== null ? +value : 0), 0);
  const validDaysCount = weeklyData.filter(({ value }) => value !== null).length;
  const average = validDaysCount > 0 ? total / validDaysCount : 0;
  const average_rounded = Math.round(average * 10) / 10;

  console.log(entries);
  console.log(pieDataByEmoji);
  console.log(pieDataByValue);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Ionicons name="arrow-back" color="black" size={25} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Mood Analytics</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>

          <View style={styles.chartsContainer}>
            {renderBackgroundStrips()}
            <LineChart
              data={weeklyData.map((entry) => ({
                label: entry.day,
                value: entry.value !== null ? parseFloat(entry.value) : 0,
              }))}
              maxValue={5}
              noOfSections={5}
              stepValue={1}
              hideRules
              dataPointsRadius={7}
              dataPointsColor="white"
              strokeDashArray={[4, 4]}
              showDataPointsForMissingValues={false}
              interpolateMissingValues={true}
              dataPoints
              hideOrigin
              height={160}
              yAxisExtraHeight={16}
              thickness={0}
              xAxisColor="transparent"
              yAxisColor="white"
              yAxisThickness={1.5}
              disableScroll
            />
          </View>

          <View style={styles.statsContainer}>
            <Text style={styles.centered}>Daily Average: {average_rounded}</Text>
          </View>

          <View style={styles.pieContainer}>
            <Text style={styles.pieTitle}>Mood Distribution by Emoji</Text>
            <PieChart
              data={pieDataByEmoji}
              showText
              textColor="black"
              radius={150}
              textSize={16}
              showValuesAsLabels
              showTextBackground
              textBackgroundRadius={20}
              strokeColor="white"
              strokeWidth={1.5}
              labelsPosition='outward'
            />
          </View>

          <View style={styles.pieContainer}>
            <Text style={styles.pieTitle}>Mood Distribution by Value</Text>
            <PieChart
              data={pieDataByValue}
              showText
              textColor="black"
              radius={150}
              textSize={16}
              showValuesAsLabels
              showTextBackground
              textBackgroundRadius={20}
              strokeColor="white"
              strokeWidth={1.5}
              labelsPosition='outward'
            />
          </View>

          <View style={styles.chartsContainer}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 20,
              }}>
              {renderLegend('5', COLORS[4])}
              {renderLegend('4', COLORS[3])}
              {renderLegend('3', COLORS[2])}
              {renderLegend('2', COLORS[1])}
              {renderLegend('1', COLORS[0])}
            </View>
          </View>



        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Analytic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9d99bc",
    alignItems: "center",
    justifyContent: "center",
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
    paddingTop: 20,
    paddingBottom: 20,
  },
  contentContainer: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 10,
  },
  chartsContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingBottom: 10,
  },
  pieContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  pieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statsContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  centered: {
    textAlign: "center",
    margin: "auto",
  },
  columns: {
    padding: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 5,
  },
});
