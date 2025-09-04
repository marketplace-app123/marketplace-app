import React, { useState } from "react";
import HomeScreen from "./src/HomeScreen";
import ProductsScreen from "./src/ProductsScreen";
import ProductDetailsScreen from "./src/ProductDetailsScreen";

export default function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Quando l'utente seleziona una categoria
  const handleSelectCategory = (id) => {
    setSelectedCategoryId(id);
    setSelectedProductId(null);
  };

  // Quando l'utente seleziona un prodotto
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

  // Se non c'è una categoria selezionata → mostra la home
  if (selectedCategoryId === null) {
    return <HomeScreen onSelectCategory={handleSelectCategory} />;
  }

  // Se c’è una categoria ma nessun prodotto selezionato → mostra lista prodotti
  if (selectedProductId === null) {
    return (
      <ProductsScreen
        categoryId={selectedCategoryId}
        onProductSelect={handleSelectProduct}
        onBack={handleBackToCategories}
      />
    );
  }

  // Se un prodotto è selezionato → mostra i dettagli del prodotto
  return (
    <ProductDetailsScreen
      productId={selectedProductId}
      onBack={handleBackToProducts}
    />
  );
}