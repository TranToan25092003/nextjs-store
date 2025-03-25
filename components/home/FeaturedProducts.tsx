import { fetchFeaturedProducts } from "@/utils/actions";
import React from "react";
import EmptyList from "../global/EmptyList";
import SectionTitle from "../global/SectionTitle";
import ProductsGrid from "../products/ProductsGrid";

const FeaturedProducts = async () => {
  const products = await fetchFeaturedProducts();

  if (products.length == 0) {
    return <EmptyList></EmptyList>;
  }

  return (
    <section className="pt-24">
      <SectionTitle text="featured products"></SectionTitle>
      <ProductsGrid products={products}></ProductsGrid>
    </section>
  );
};

export default FeaturedProducts;
