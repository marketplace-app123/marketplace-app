import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { API_BASE_URL, API_KEYS } from "./config";

// Schermata iniziale: mostra categorie
const HomeScreen = ({ onSelectCategory }) => {
  const categories = [
    { id: 1, name: "Categoria 1" },
    { id: 2, name: "Categoria 2" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleziona una categoria</Text>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat.id}
          style={styles.button}
          onPress={() => onSelectCategory(cat.id)}
        >
          <Text style={styles.buttonText}>{cat.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Lista prodotti di una categoria
const ProductsScreen = ({ categoryId, onSelectProduct, onBack }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/products?category=${categoryId}`, {
          auth: {
            username: API_KEYS.consumerKey,
            password: API_KEYS.consumerSecret,
          },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Errore caricando i prodotti:", err.message);
      }
    };
    fetchProducts();
  }, [categoryId]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>⬅ Torna indietro</Text>
      </TouchableOpacity>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => onSelectProduct(item.id)}
          >
            <Text>{item.name}</Text>
            <Text>{item.price} €</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Dettaglio prodotto
const ProductDetailsScreen = ({ productId, onBack }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/products/${productId}`, {
          auth: {
            username: API_KEYS.consumerKey,
            password: API_KEYS.consumerSecret,
          },
        });
        setProduct(res.data);
      } catch (err) {
        console.error("Errore caricando il prodotto:", err.message);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Caricamento...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>⬅ Torna indietro</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text>Prezzo: {product.price} €</Text>
    </View>
  );
};

// App principale
export default function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  if (selectedProductId) {
    return (
      <ProductDetailsScreen
        productId={selectedProductId}
        onBack={() => setSelectedProductId(null)}
      />
    );
  }

  if (selectedCategoryId) {
    return (
      <ProductsScreen
        categoryId={selectedCategoryId}
        onSelectProduct={setSelectedProductId}
        onBack={() => setSelectedCategoryId(null)}
      />
    );
  }

  return <HomeScreen onSelectCategory={setSelectedCategoryId} />;
}

// Stili
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  button: {
    padding: 15,
    backgroundColor: "#007bff",
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: { color: "#fff", textAlign: "center" },
  backButton: { marginBottom: 20 },
  backButtonText: { color: "blue" },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});