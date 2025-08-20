import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/HomeScreen";
import LinkScreen from "./src/LinkScreen";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
<Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: true,
    tabBarShowLabel: false, // niente testo sotto
    tabBarStyle: { height: 64 },
    tabBarIconStyle: { marginTop: 8 },
    tabBarActiveTintColor: "#111827",
    tabBarInactiveTintColor: "#9CA3AF",
    tabBarIcon: ({ color, size }) => {
      const map = {
        Home: "home",
        Compra: "cart",
        Vendi: "person-add",
        Wishlist: "heart",
        Eventi: "calendar",
        Chat: "chatbubbles",
        FAQ: "help-circle",
        Contatti: "call",
      };
      const name = map[route.name] || "ellipse";
      return <Ionicons name={name} size={28} color={color} />;
    },
  })}
>
  <Tab.Screen name="Home" component={HomeScreen} />

  <Tab.Screen name="Compra">
    {() => <LinkScreen fullUrl="https://marketplace.eventiefiere.com/shop/" />}
  </Tab.Screen>

  <Tab.Screen name="Vendi">
    {() => <LinkScreen fullUrl="https://marketplace.eventiefiere.com/mio-account/" />}
  </Tab.Screen>

  <Tab.Screen name="Wishlist">
    {() => <LinkScreen fullUrl="https://marketplace.eventiefiere.com/wishlist/" />}
  </Tab.Screen>

  <Tab.Screen name="Eventi">
    {() => <LinkScreen fullUrl="https://www.eventiefiere.com/eventi" />}
  </Tab.Screen>

  <Tab.Screen name="Chat">
    {() => <LinkScreen fullUrl="https://marketplace.eventiefiere.com/mio-account/messaggi/" />}
  </Tab.Screen>

  <Tab.Screen name="FAQ">
    {() => <LinkScreen fullUrl="https://marketplace.eventiefiere.com/faq/" />}
  </Tab.Screen>

  <Tab.Screen name="Contatti">
    {() => <LinkScreen fullUrl="https://marketplace.eventiefiere.com/contatti/" />}
  </Tab.Screen>
</Tab.Navigator>
    </NavigationContainer>
  );
}
