import React from "react";
import { Product } from "@prisma/client";
import { formatCurrency } from "@/utils/format";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import FavoriteToggleButton from "./FavoriteToggleButton";

const ProductsGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map(({ id, name, price, image }) => {
        const dollar = formatCurrency(price);
        return (
          <article className="group relative" key={id}>
            <Link href={`/products/${id}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-4">
                  <div className="relative h-64 md:h-48 rounded overflow-hidden">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                      priority
                      className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    ></Image>
                  </div>

                  <div className="mt-4 text-center">
                    <h2 className="text-lg capitalize">{name} </h2>
                    <p className="text-muted-foreground mt-2">{dollar}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <div className="absolute top-12 right-7 z-5">
              <FavoriteToggleButton productId={id}></FavoriteToggleButton>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
