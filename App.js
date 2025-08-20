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
          tabBarIcon: ({ color, size }) => {
            const map = {
              Home: "home",
              Compra: "cart",
              Vendi: "pricetags",
              Wishlist: "heart",
              Eventi: "calendar",
              Chat: "chatbubbles",
              FAQ: "help-circle",
              Contatti: "call",
            };
            return <Ionicons name={map[route.name] || "ellipse"} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Compra">{() => <LinkScreen path="/shop" />}</Tab.Screen>
        <Tab.Screen name="Vendi">{() => <LinkScreen path="/seller-dashboard" />}</Tab.Screen>
        <Tab.Screen name="Wishlist">{() => <LinkScreen path="/wishlist" />}</Tab.Screen>
        <Tab.Screen name="Eventi">{() => <LinkScreen fullUrl="https://www.eventiefiere.com/eventi" />}</Tab.Screen>
        <Tab.Screen name="Chat">{() => <LinkScreen path="/messages" />}</Tab.Screen>
        <Tab.Screen name="FAQ">{() => <LinkScreen path="/faq" />}</Tab.Screen>
        <Tab.Screen name="Contatti">{() => <LinkScreen path="/contatti" />}</Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
