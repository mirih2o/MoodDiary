import "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "./src/BottomTab/Home";
import Analytic from "./src/BottomTab/Analytic";
import CalendarScreen from "./src/BottomTab/CalendarScreen";
import Diary from "./src/Stack/Diary";
import Dream from "./src/Stack/Dream";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Calendar"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar" color={color} size={24} />
          ),
        }}
        component={CalendarScreen}
      />
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={24} />
          ),
        }}
        component={Stacknavigator}
      />

      <Tab.Screen
        name="Analytic"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="analytics" color={color} size={24} />
          ),
        }}
        component={Analytic}
      />
    </Tab.Navigator>
  );
}

function Stacknavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="Diary" component={Diary} />
      <Stack.Screen name="Dream" component={Dream} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
