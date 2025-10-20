import { StatusBar } from "expo-status-bar";
import { Linking, Platform, SafeAreaView, Text, View, Pressable } from "react-native";

// Generic function to open links safely
const openLink = async (url) => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      alert("Impossibile aprire il link: " + url);
    }
  } catch (e) {
    alert("Si è verificato un problema nell'apertura del link.");
  }
};

// Reusable big button component
const ButtonBig = ({ label, url }) => (
  <Pressable
    onPress={() => openLink(url)}
    style={({ pressed }) => [
      {
        backgroundColor: pressed ? "#c1121f" : "#d90429",
        paddingVertical: 18,
        paddingHorizontal: 22,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
      },
    ]}
  >
    <Text
      style={{
        color: "white",
        fontWeight: "700",
        fontSize: 18,
        textAlign: "center",
      }}
    >
      {label}
    </Text>
  </Pressable>
);

// Main app component
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style={Platform.OS === "ios" ? "dark" : "light"} />
      <View
        style={{
          flex: 1,
          padding: 22,
          gap: 24,
          justifyContent: "center",
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 8 }}>
          <Text
            style={{ fontSize: 28, fontWeight: "800", color: "#d90429" }}
          >
            Eventi e Fiere
          </Text>
          <Text style={{ fontSize: 14, color: "#6b7280", marginTop: 6 }}>
            Tucano Fiere • Codevilla (PV)
          </Text>
        </View>

        {/* Four buttons with different labels and URLs */}
        <ButtonBig label="Home" url="https://marketplace.eventiefiere.com" />
        <ButtonBig label="Eventi" url="https://www.eventiefiere.com" />
        <ButtonBig label="Marketplace" url="https://marketplace.eventiefiere.com" />
        <ButtonBig label="Login" url="https://marketplace.eventiefiere.com/mio-account/" />

        {/* Link to the marketplace site below */}
        <View style={{ alignItems: "center", marginTop: 8 }}>
          <Text
            onPress={() => openLink("https://marketplace.eventiefiere.com")}
            style={{
              color: "#2563eb",
              textDecorationLine: "underline",
              marginTop: 6,
            }}
          >
            marketplace.eventiefiere.com
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}