"use client";

import { usePathname } from "next/navigation";
import FormContainer from "../form/FormContainer";
import { toggleFavoriteAction } from "@/utils/actions";
import { CardSubmitButton } from "../form/Button";

type FavoriteToggleFormProps = {
  productId: string;
  favoriteId: string | null;
};

const FavoriteToggleForm = ({
  favoriteId,
  productId,
}: FavoriteToggleFormProps) => {
  const pathName = usePathname();

  const toggleAction = toggleFavoriteAction.bind(null, {
    productId,
    favoriteId,
    pathName,
  });

  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton
        isFavorite={favoriteId ? true : false}
      ></CardSubmitButton>
    </FormContainer>
  );
};

export default FavoriteToggleForm;
