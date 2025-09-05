// src/HomeScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList } from "react-native";
import { fetchRootCategories } from "../api";

export default function HomeScreen({ onSelectCategory }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setError("");
        const data = await fetchRootCategories();
        setCategories(data);
      } catch (e) {
        const msg = e.response?.status
          ? `Errore: ${e.response.status}`
          : "Errore di rete";
        setError(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loading title="Carico categorie..." />;
  if (error) return <ErrorView title="Categorie" message={error} />;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 26, fontWeight: "700", marginBottom: 12 }}>Categorie</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelectCategory(item)}
            style={{
              backgroundColor: "#1976D2",
              padding: 14,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
              {item.name} {typeof item.count === "number" ? `(${item.count})` : ""}
            </Text>
            {item.slug ? (
              <Text style={{ color: "white", opacity: 0.8, marginTop: 4 }}>
                slug: {item.slug}
              </Text>
            ) : null}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function Loading({ title }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 12 }}>{title}</Text>
    </View>
  );
}

function ErrorView({ title, message }) {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 26, fontWeight: "700", marginBottom: 8 }}>{title}</Text>
      <Text style={{ color: "#B71C1C" }}>{message}</Text>
    </View>
  );
}

