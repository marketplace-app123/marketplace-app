import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/HomeScreen";
import LinkScreen from "./src/LinkScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator screenOptions={{ headerShown: true }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Compra">
          {() => <LinkScreen title="Compra" path="/shop" />}
        </Tab.Screen>
        <Tab.Screen name="Vendi">
          {() => <LinkScreen title="Vendi" path="/seller-dashboard" />}
        </Tab.Screen>
        <Tab.Screen name="Wishlist">
          {() => <LinkScreen title="Wishlist" path="/wishlist" />}
        </Tab.Screen>
        <Tab.Screen name="Eventi">
          {() => <LinkScreen title="Eventi" fullUrl="https://www.eventiefiere.com/eventi" />}
        </Tab.Screen>
        <Tab.Screen name="Chat">
          {() => <LinkScreen title="Chat" path="/messages" />}
        </Tab.Screen>
        <Tab.Screen name="FAQ">
          {() => <LinkScreen title="FAQ" path="/faq" />}
        </Tab.Screen>
        <Tab.Screen name="Contatti">
          {() => <LinkScreen title="Contatti" path="/contatti" />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
