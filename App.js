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

  const handleSelectProduct = (id) => {
    setSelectedProductId(id);
  };

  const handleBackToCategories = () => {
    setSelectedCategoryId(null);
    setSelectedProductId(null);
  };

  const handleBackToProducts = () => {
    setSelectedProductId(null);
  };

  if (selectedCategoryId === null) {
    return <HomeScreen onSelectCategory={handleSelectCategory} />;
  }

  if (selectedProductId === null) {
    return (
      <ProductsScreen
        categoryId={selectedCategoryId}
        onProductSelect={handleSelectProduct}
        onBack={handleBackToCategories}
      />
    );
  }

  return (
    <ProductDetailScreen
      productId={selectedProductId}
      onBack={handleBackToProducts}
    />
  );
}
