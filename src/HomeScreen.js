import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { getCategories } from "./marketplace";

export default function HomeScreen({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories({ per_page: 30 });
        // filter top-level categories (parent equals 0)
        const topCategories = data.filter((c) => c.parent === 0);
        setCategories(topCategories);
      } catch (e) {
        setError(e.message || "Errore nel recupero categorie");
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Caricamento categorie...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onSelectCategory && onSelectCategory(item.id)}
      style={{
        flex: 1,
        alignItems: "center",
        padding: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#eee",
        margin: 4,
      }}
    >
      <Image
        source={{ uri: item?.image?.src || "https://via.placeholder.com/128" }}
        style={{ width: 64, height: 64, borderRadius: 12 }}
        resizeMode="cover"
      />
      <Text
        numberOfLines={2}
        style={{ marginTop: 8, textAlign: "center", fontWeight: "600" }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => String(item.id)}
      numColumns={3}
      contentContainerStyle={{ padding: 16 }}
      columnWrapperStyle={{ gap: 12 }}
      renderItem={renderItem}
      ListEmptyComponent={
        <View style={{ padding: 16 }}>
          <Text>Nessuna categoria disponibile.</Text>
        </View>
      }
    />
  );
}
