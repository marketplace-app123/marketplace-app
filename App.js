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
          tabBarShowLabel: false, // niente testo
          tabBarStyle: { height: 64 }, // un filo più alta
          tabBarIconStyle: { marginTop: 8 }, // icone centrate
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
            return <Ionicons name={map[route.name] || "ellipse"} size={28} color={color} />;
          },
        })}
      >
        {/* tab bar nascosta SOLO in Home */}
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarStyle: { display: "none" } }}
        />

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
