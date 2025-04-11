import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const LoadingContainer = () => {
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-1 w-full h-[500px]">
      <LoadingProduct></LoadingProduct>
    </div>
  );
};

const LoadingProduct = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <Skeleton className="h-48 w-full"></Skeleton>
        <Skeleton className="h-4 w-3/4 mt-4"></Skeleton>
        <Skeleton className="h-4 w-1/2 mt-4"></Skeleton>
      </CardContent>
    </Card>
  );
};

export default LoadingContainer;
