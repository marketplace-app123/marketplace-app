// src/ProductDetailsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, Image, ScrollView } from "react-native";
import { fetchProduct } from "../api";

export default function ProductDetailsScreen({ productId, onBack }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setError("");
        const data = await fetchProduct(productId);
        setProduct(data);
      } catch (e) {
        const msg = e?.response?.status ? `Errore: ${e.response.status}` : "Errore di rete";
        setError(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, [productId]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Carico prodotto...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TouchableOpacity onPress={onBack}>
        <Text style={{ color: "#1976D2", marginBottom: 12 }}>← Torna indietro</Text>
      </TouchableOpacity>

      {error ? (
        <Text style={{ color: "#B71C1C" }}>{error}</Text>
      ) : product ? (
        <ScrollView>
          {product.images?.[0]?.src ? (
            <Image
              source={{ uri: product.images[0].src }}
              style={{ width: "100%", height: 220, borderRadius: 12, marginBottom: 12, backgroundColor: "#EEE" }}
              resizeMode="cover"
            />
          ) : null}

          <Text style={{ fontSize: 22, fontWeight: "700" }}>{product.name}</Text>

          {product.price ? (
            <Text style={{ fontSize: 18, marginTop: 6 }}>
              {Number(product.price).toFixed(2)} €
            </Text>
          ) : null}

          {product.short_description ? (
            <Text style={{ marginTop: 12 }}>{stripHtml(product.short_description)}</Text>
          ) : null}

          {product.description ? (
            <Text style={{ marginTop: 12, opacity: 0.8 }}>{stripHtml(product.description)}</Text>
          ) : null}
        </ScrollView>
      ) : (
        <Text>Nessun dato prodotto.</Text>
      )}
    </View>
  );
}

function stripHtml(html) {
  return String(html || "").replace(/<[^>]+>/g, "").trim();
}

