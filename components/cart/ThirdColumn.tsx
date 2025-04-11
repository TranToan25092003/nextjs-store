"use client";
import { useState } from "react";
import SelectProductAmount from "../single-product/SelectProductAmount";
import { Mode } from "../single-product/SelectProductAmount";
import FormContainer from "../form/FormContainer";
import { removeCartItemAction, updateCartItemAction } from "@/utils/actions";
import SubmitButton from "../form/Button";
import { toast } from "sonner";

const ThirdColumn = ({ quantity, id }: { quantity: number; id: string }) => {
  const [amount, setAmount] = useState(quantity);
  const [isLoading, setLoading] = useState(false);

  const handleAmountChange = async (value: number) => {
    setLoading(true);
    toast("Calculating...", {
      position: "top-right",
      action: {
        label: "x",
        onClick: () => {
          toast.dismiss();
        },
      },
    });

    const result = await updateCartItemAction({
      amount: value,
      cartItemId: id,
    });

    toast(result.message, {
      position: "top-right",
      action: {
        label: "x",
        onClick: () => {
          toast.dismiss();
        },
      },
    });

    setLoading(false);

    setAmount(value);
  };

  return (
    <div className="md:ml-8">
      <SelectProductAmount
        amount={amount}
        setAmount={handleAmountChange}
        mode={Mode.CartItem}
        isLoading={false}
      ></SelectProductAmount>

      <FormContainer action={removeCartItemAction}>
        <input type="hidden" name="id" value={id} />
        <SubmitButton size="sm" className="mt-4" text="remove"></SubmitButton>
      </FormContainer>
    </div>
  );
};

export default ThirdColumn;
