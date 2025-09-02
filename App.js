import React, { useState } from "react";
import HomeScreen from "./src/HomeScreen";
import ProductsScreen from "./src/ProductsScreen";
import ProductDetailScreen from "./src/ProductDetailScreen";

export default function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Gestisce la selezione della categoria
  const handleSelectCategory = (id) => {
    setSelectedCategoryId(id);
    setSelectedProductId(null);
  };

  // Gestisce la selezione del prodotto
  const handleSelectProduct = (id) => {
    setSelectedProductId(id);
  };

  // Torna alla lista categorie
  const handleBackToCategories = () => {
    setSelectedCategoryId(null);
    setSelectedProductId(null);
  };

  // Torna alla lista prodotti
  const handleBackToProducts = () => {
    setSelectedProductId(null);
  };

  // Nessuna categoria selezionata: mostra HomeScreen
  if (selectedCategoryId === null) {
    return <HomeScreen onSelectCategory={handleSelectCategory} />;
  }

  // Categoria selezionata ma nessun prodotto: mostra ProductsScreen
  if (selectedProductId === null) {
    return (
      <ProductsScreen
        categoryId={selectedCategoryId}
        onProductSelect={handleSelectProduct}
        onBack={handleBackToCategories}
      />
    );
  }

  // Prodotto selezionato: mostra il dettaglio
  return (
    <ProductDetailScreen
      productId={selectedProductId}
      onBack={handleBackToProducts}
    />
  );
}
