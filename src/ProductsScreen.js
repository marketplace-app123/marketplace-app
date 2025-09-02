import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { getProducts } from "./marketplace";

export default function ProductsScreen({ categoryId, onProductSelect, onBack }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts({ category: categoryId, per_page: 30 });
        const items = Array.isArray(data) ? data : data.items || [];
        setProducts(items);
      } catch (e) {
        setError(e.message || "Errore nel recupero prodotti");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [categoryId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
        <TouchableOpacity onPress={onBack}>
          <Text style={{ marginTop: 12, color: "blue" }}>Indietro</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={onBack} style={{ padding: 16 }}>
        <Text style={{ color: "blue" }}>← Torna alle categorie</Text>
      </TouchableOpacity>
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => onProductSelect(item.id)}
          >
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price} €</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>Nessun prodotto disponibile.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  productCard: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 12,
  },
  productName: {
    fontWeight: "600",
    marginBottom: 4,
  },
  productPrice: {
    color: "#333",
  },
});
