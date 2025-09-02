import React, { useState } from "react";
import HomeScreen from "./src/HomeScreen";
import ProductsScreen from "./src/ProductsScreen";
import ProductDetailScreen from "./src/ProductDetailScreen";

export default function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleSelectCategory = (id) => {
    setSelectedCategoryId(id);
    setSelectedProductId(null);
  };

<<<<<<< HEAD
=======
  // Gestisce la selezione del prodotto
>>>>>>> 63bdeb44 (Fix App.js)
  const handleSelectProduct = (id) => {
    setSelectedProductId(id);
  };

<<<<<<< HEAD
=======
  // Torna alla lista categorie
>>>>>>> 63bdeb44 (Fix App.js)
  const handleBackToCategories = () => {
    setSelectedCategoryId(null);
    setSelectedProductId(null);
  };

<<<<<<< HEAD
=======
  // Torna alla lista prodotti
>>>>>>> 63bdeb44 (Fix App.js)
  const handleBackToProducts = () => {
    setSelectedProductId(null);
  };

<<<<<<< HEAD
=======
  // Nessuna categoria selezionata: mostra HomeScreen
>>>>>>> 63bdeb44 (Fix App.js)
  if (selectedCategoryId === null) {
    return <HomeScreen onSelectCategory={handleSelectCategory} />;
  }

<<<<<<< HEAD
=======
  // Categoria selezionata ma nessun prodotto: mostra ProductsScreen
>>>>>>> 63bdeb44 (Fix App.js)
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
<<<<<<< HEAD
=======





>>>>>>> 63bdeb44 (Fix App.js)
