import React from "react";
import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex:1, alignItems:"center", justifyContent:"center", padding:24 }}>
      <Text style={{ fontSize:26, fontWeight:"800", textAlign:"center" }}>Marketplace</Text>
      <Text style={{ marginTop:8, textAlign:"center" }}>
        Compra e vendi oggetti nuovi e usati. Ogni scheda dell'app apre la pagina corrispondente del sito.
      </Text>
    </View>
  );
}
