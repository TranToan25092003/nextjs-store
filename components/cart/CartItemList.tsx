"use client";
import { Card } from "@/components/ui/card";
import { FirstColumn, SecondColumn, FourthColumn } from "./CartItemColumns";
import ThirdColumn from "./ThirdColumn";
import { CartItemWithProduct } from "@/utils/types";

const CartItemList = ({ cartItems }: { cartItems: CartItemWithProduct[] }) => {
  return (
    <div>
      {cartItems.map(({ product, id, amount }) => {
        const { image, name, company, price, id: productId } = product;
        return (
          <Card
            key={id}
            className="flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4"
          >
            <FirstColumn image={image} name={name}></FirstColumn>
            <SecondColumn
              name={name}
              company={company}
              productId={productId}
            ></SecondColumn>
            <ThirdColumn id={id} quantity={amount}></ThirdColumn>
            <FourthColumn price={price}></FourthColumn>
          </Card>
        );
      })}
    </div>
  );
};

export default CartItemList;
