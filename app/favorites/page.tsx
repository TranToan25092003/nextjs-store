import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { fetchUserFavorites } from "@/utils/actions";
import React from "react";

const FavoritesPage = async () => {
  const favorites = await fetchUserFavorites();

  if (favorites.length === 0)
    return <SectionTitle text="You have no favorites yet"></SectionTitle>;

  return (
    <div>
      <SectionTitle text="Favorites"></SectionTitle>
      <ProductsGrid
        products={favorites.map((favorite) => {
          return favorite.product;
        })}
      ></ProductsGrid>
    </div>
  );
};

export default FavoritesPage;
