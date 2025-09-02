import React, { useState } from "react";
import HomeScreen from "./src/HomeScreen";
import ProductsScreen from "./src/ProductsScreen";
import ProductDetailScreen from "./src/ProductDetailScreen";

export default function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Callback when a category is selected
  const handleSelectCategory = (id) => {
    setSelectedCategoryId(id);
    setSelectedProductId(null);
  };

  // Callback when a product is selected
  const handleSelectProduct = (id) => {
    setSelectedProductId(id);
  };

  // Return to category list
  const handleBackToCategories = () => {
    setSelectedCategoryId(null);
    setSelectedProductId(null);
  };

  // Return to product list
  const handleBackToProducts = () => {
    setSelectedProductId(null);
  };

  // Show categories until a category is selected
  if (selectedCategoryId === null) {
    return <HomeScreen onSelectCategory={handleSelectCategory} />;
  }

  // Show products list until a product is selected
  if (selectedProductId === null) {
    return (
      <ProductsScreen
        categoryId={selectedCategoryId}
        onProductSelect={handleSelectProduct}
        onBack={handleBackToCategories}
      />
    );
  }

  // Show product detail
  return (
    <ProductDetailScreen
      productId={selectedProductId}
      onBack={handleBackToProducts}
    />
  );
}
https://github.com/marketplace-app123/marketplace-app
