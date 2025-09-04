import React, { useState } from "react";
import HomeScreen from "./src/HomeScreen";
import ProductsScreen from "./src/ProductsScreen";
import ProductDetailsScreen from "./src/ProductDetailsScreen";

export default function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Seleziona una categoria
  const handleSelectCategory = (id) => {
    setSelectedCategoryId(id);
    setSelectedProductId(null);
  };

  // Seleziona un prodotto
  const handleSelectProduct = (id) => {
    setSelectedProductId(id);
  };

  // Torna alla lista delle categorie
  const handleBackToCategories = () => {
    setSelectedCategoryId(null);
    setSelectedProductId(null);
  };

  // Torna alla lista dei prodotti
  const handleBackToProducts = () => {
    setSelectedProductId(null);
  };

  // Nessuna categoria selezionata → mostra Home
  if (selectedCategoryId === null) {
    return <HomeScreen onSelectCategory={handleSelectCategory} />;
  }

  // Categoria selezionata ma nessun prodotto → mostra lista prodotti
  if (selectedProductId === null) {
    return (
      <ProductsScreen
        categoryId={selectedCategoryId}
        onProductSelect={handleSelectProduct}
        onBack={handleBackToCategories}
      />
    );
  }

  // Prodotto selezionato → mostra dettaglio
  return (
    <ProductDetailsScreen
      productId={selectedProductId}
      onBack={handleBackToProducts}
    />
  );
}