import React, { useEffect } from "react";
import { View, Text } from "react-native";
import api from "./src/woocommerce";

export default function App() {
  useEffect(() => {
    api.get("products")
      .then((response) => {
        console.log("Prodotti ricevuti:", response.data);
      })
      .catch((error) => {
        console.error("Errore API:", error);
      });
  }, []);
