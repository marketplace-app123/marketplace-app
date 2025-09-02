import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { getCategories } from "./marketplace";

export default function HomeScreen() {

  const [categories, setCategories] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCategories() {
const data = await getCategories({ per_page: 30 });

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
        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={categories}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            padding: 12,
            borderWidth: 1,
            borderColor: "#eee",
            borderRadius: 8,
          }}
        >
          <Image
            source={{ uri: (item.image && item.image.src) || "https://via.placeholder.com/128" }}
            style={{ width: 64, height: 64, marginBottom: 8, borderRadius: 12 }}
            resizeMode="cover"
          />
          <Text style={{ textAlign: "center" }}>{item.name}</Text>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <View style={{ padding: 16 }}>
          <Text>Nessuna categoria disponibile.</Text>
        </View>
      }
    />
  );
}
