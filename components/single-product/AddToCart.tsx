"use client";
import { useState } from "react";
import SelectProductAmount from "./SelectProductAmount";
import { Mode } from "./SelectProductAmount";
import FormContainer from "../form/FormContainer";
import { addToCartAction } from "@/utils/actions";
import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import SubmitButton, { ProductSignInButton } from "../form/Button";
import { Select } from "@radix-ui/react-select";

const AddToCart = ({ productId }: { productId: string }) => {
  const [amount, setAmount] = useState(1);

  const { userId } = useAuth();

  return (
    <div className="mt-4">
      <SelectProductAmount
        mode={Mode.SingleProduct}
        amount={amount}
        setAmount={setAmount}
      ></SelectProductAmount>
      {userId ? (
        <FormContainer action={addToCartAction}>
          <input type="hidden" name="productId" value={productId}></input>
          <input type="hidden" name="amount" value={amount}></input>
          <SubmitButton text="add to cart" className="mt-8"></SubmitButton>
        </FormContainer>
      ) : (
        <ProductSignInButton></ProductSignInButton>
      )}
    </div>
  );
};

export default AddToCart;
