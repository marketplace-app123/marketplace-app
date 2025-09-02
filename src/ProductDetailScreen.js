import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { getProduct } from "./marketplace";

export default function ProductDetailScreen({ productId, onBack }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await getProduct(productId);
        setProduct(data);
      } catch (e) {
        setError(e.message || "Errore nel recupero del prodotto");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error || "Prodotto non trovato."}</Text>
        <TouchableOpacity onPress={onBack}>
          <Text style={{ marginTop: 12, color: "blue" }}>Indietro</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { images, name, description, price, vendor } = product;
  const cleanDescription = description ? description.replace(/<[^>]+>/g, "") : "";

  return (
    <ScrollView style={{ flex: 1 }}>
      <TouchableOpacity onPress={onBack} style={{ padding: 16 }}>
        <Text style={{ color: "blue" }}>← Torna ai prodotti</Text>
      </TouchableOpacity>
      {images && images.length > 0 && (
        <Image source={{ uri: images[0] }} style={{ width: "100%", height: 250 }} resizeMode="cover" />
      )}
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>{name}</Text>
        <Text style={{ fontSize: 18, marginBottom: 12 }}>{price} €</Text>
        <Text style={{ marginBottom: 16 }}>{cleanDescription}</Text>
        {vendor && (
          <View style={{ marginTop: 12 }}>
            <Text style={{ fontWeight: "600" }}>Venditore: {vendor.store_name}</Text>
            {vendor.address && (
              <Text>
                {vendor.address.city}, {vendor.address.state} {vendor.address.country}
              </Text>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
});
