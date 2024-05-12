import "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "./src/BottomTab/Home";
import Analytic from "./src/BottomTab/Analytic";
import Calendar from "./src/BottomTab/Calendar";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Calendar"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar" color={color} size={24} />
          ),
        }}
        component={Calendar}
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
      <Stack.Screen name="Calendar" component={Calendar} />
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
