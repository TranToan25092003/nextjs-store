import React from "react";
import { FaHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import { auth } from "@clerk/nextjs/server";
import { CardSingInButton } from "../form/Button";
import { fetchFavoriteId } from "@/utils/actions";
import FavoriteToggleForm from "./FavoriteToggleForm";

const FavoriteToggleButton = async ({ productId }: { productId: string }) => {
  const { userId } = await auth();

  if (!userId) return <CardSingInButton></CardSingInButton>;

  const favoriteId = await fetchFavoriteId({ productId });

  return (
    <FavoriteToggleForm
      favoriteId={favoriteId}
      productId={productId}
    ></FavoriteToggleForm>
  );
};

export default FavoriteToggleButton;
