// src/ProductsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList, Image } from "react-native";
import { fetchProductsByCategory } from "../api";

function formatPrice(p) {
  if (!p) return "";
  const v = Number(p);
  return Number.isNaN(v) ? String(p) : `${v.toFixed(2)} €`;
}

export default function ProductsScreen({ category, onBack, onSelectProduct }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setError("");
        const data = await fetchProductsByCategory(category.id);
        setProducts(data);
      } catch (e) {
        const msg = e?.response?.status ? `Errore: ${e.response.status}` : "Errore di rete";
        setError(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, [category?.id]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Carico prodotti...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TouchableOpacity onPress={onBack}>
        <Text style={{ color: "#1976D2", marginBottom: 12 }}>← Torna indietro</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 8 }}>
        {category?.name}
      </Text>

      {error ? (
        <Text style={{ color: "#B71C1C" }}>{error}</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onSelectProduct(item.id)}
              style={{
                backgroundColor: "#E3F2FD",
                padding: 12,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {item.images?.[0]?.src ? (
                <Image
                  source={{ uri: item.images[0].src }}
                  style={{ width: 56, height: 56, borderRadius: 8, marginRight: 12 }}
                />
              ) : null}
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                <Text style={{ opacity: 0.7 }}>{formatPrice(item.price)}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={{ marginTop: 24 }}>Nessun prodotto trovato.</Text>}
        />
      )}
    </View>
  );
}

