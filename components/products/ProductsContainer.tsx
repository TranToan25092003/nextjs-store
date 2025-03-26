import React from "react";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchAllProducts } from "@/utils/actions";
import Link from "next/link";

const ProductsContainer = async ({
  layout,
  search,
}: {
  layout: string;
  search: string;
}) => {
  const products = await fetchAllProducts({
    search,
  });

  const totalProducts = products.length;

  const searchTerms = search ? `&search=${search}` : "";

  return (
    <>
      {/* headers */}
      <section className="">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg">
            {totalProducts} product{totalProducts > 1 && "s"}
          </h4>
          <div className="flex gap-x-4">
            <Button
              size={"icon"}
              asChild
              variant={layout == "grid" ? "default" : "ghost"}
            >
              <Link href={`/products?layout=grid${searchTerms}`}>
                <LuLayoutGrid></LuLayoutGrid>
              </Link>
            </Button>

            <Button
              size={"icon"}
              asChild
              variant={layout == "list" ? "default" : "ghost"}
            >
              <Link href={`/products?layout=list${searchTerms}`}>
                <LuList></LuList>
              </Link>
            </Button>
          </div>
        </div>

        <Separator className="mt-4"></Separator>
      </section>
      {/* products */}
      <div className="">
        {totalProducts == 0 ? (
          <h5 className=" text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        ) : layout == "grid" ? (
          <ProductsGrid products={products}></ProductsGrid>
        ) : (
          <ProductsList products={products}></ProductsList>
        )}
      </div>
    </>
  );
};

export default ProductsContainer;
