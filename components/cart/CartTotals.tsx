import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/format";
import FormContainer from "../form/FormContainer";
import { Cart } from "@prisma/client";
import SubmitButton from "../form/Button";
import { createOrderAction } from "@/utils/actions";

import React from "react";

const CartTotalRow = ({
  label,
  amount,
  lastRow,
}: {
  label: string;
  amount: number;
  lastRow?: boolean;
}) => {
  return (
    <>
      <p className="flex justify-between text-sm">
        <span className="">{label}</span>
        <span>{formatCurrency(amount)}</span>
      </p>
      {lastRow ? null : <Separator className="my-2"></Separator>}
    </>
  );
};

const CartTotals = ({ cart }: { cart: Cart }) => {
  const { cartTotal, shipping, tax, orderTotal } = cart;

  return (
    <div>
      <Card className="p-8">
        <CartTotalRow label="Subtotal" amount={cartTotal}></CartTotalRow>
        <CartTotalRow label="Shipping" amount={shipping}></CartTotalRow>
        <CartTotalRow label="Tax" amount={tax}></CartTotalRow>
        <CardTitle className="mt-6">
          <CartTotalRow
            label="Order total"
            amount={orderTotal}
            lastRow={true}
          ></CartTotalRow>
        </CardTitle>
      </Card>
      <FormContainer action={createOrderAction}>
        <SubmitButton text="Place Order" className="w-full mt-8"></SubmitButton>
      </FormContainer>
    </div>
  );
};

export default CartTotals;
