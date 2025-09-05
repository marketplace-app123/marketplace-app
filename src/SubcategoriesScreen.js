// src/SubcategoriesScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList } from "react-native";
import { fetchSubcategories } from "../api";

export default function SubcategoriesScreen({ parentCategory, onBack, onSelectSubcategory }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setError("");
        const data = await fetchSubcategories(parentCategory.id);
        setSubcategories(data);
      } catch (e) {
        const msg = e.response?.status
          ? `Errore: ${e.response.status}`
          : "Errore di rete";
        setError(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, [parentCategory?.id]);

  if (loading) return <Loading title="Carico sottocategorie..." />;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TouchableOpacity onPress={onBack}>
        <Text style={{ color: "#1976D2", marginBottom: 12 }}>← Torna indietro</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 8 }}>
        {parentCategory?.name}
      </Text>

      {error ? (
        <Text style={{ color: "#B71C1C" }}>{error}</Text>
      ) : (
        <FlatList
          data={subcategories}
          keyExtractor={(item) => String(item.id)}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onSelectSubcategory(item)}
              style={{
                backgroundColor: "#2196F3",
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
          ListEmptyComponent={
            <Text style={{ marginTop: 24 }}>
              Nessuna sottocategoria trovata. Prova a selezionare direttamente i prodotti.
            </Text>
          }
        />
      )}
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