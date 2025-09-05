// App.js
import React, { useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import HomeScreen from "./src/HomeScreen";
import SubcategoriesScreen from "./src/SubcategoriesScreen";
import ProductsScreen from "./src/ProductsScreen";
import ProductDetailsScreen from "./src/ProductDetailsScreen";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null); // oggetto categoria (root)
  const [selectedSubcategory, setSelectedSubcategory] = useState(null); // oggetto sottocategoria
  const [selectedProductId, setSelectedProductId] = useState(null);

  const goBackToHome = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedProductId(null);
  };

  const goBackToSubcategories = () => {
    setSelectedSubcategory(null);
    setSelectedProductId(null);
  };

  const goBackToProducts = () => {
    setSelectedProductId(null);
  };

  // Navigazione a stati (senza librerie)
  let Screen = null;

  if (!selectedCategory) {
    Screen = (
      <HomeScreen
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />
    );
  } else if (!selectedSubcategory) {
    Screen = (
      <SubcategoriesScreen
        parentCategory={selectedCategory}
        onBack={goBackToHome}
        onSelectSubcategory={(subcat) => setSelectedSubcategory(subcat)}
      />
    );
  } else if (!selectedProductId) {
    Screen = (
      <ProductsScreen
        category={selectedSubcategory}
        onBack={goBackToSubcategories}
        onSelectProduct={(id) => setSelectedProductId(id)}
      />
    );
  } else {
    Screen = (
      <ProductDetailsScreen
        productId={selectedProductId}
        onBack={goBackToProducts}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" />
      {Screen}
    </SafeAreaView>
  );
}
