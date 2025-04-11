import CartItemList from "@/components/cart/CartItemList";
import CartTotals from "@/components/cart/CartTotals";
import SectionTitle from "@/components/global/SectionTitle";
import { fetchOrCreateCart, updateCart } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const previousCart = await fetchOrCreateCart({ userId: userId });

  const { cartItems, currCart } = await updateCart(previousCart);

  if (currCart.numItemsInCart === 0) {
    return <SectionTitle text="Empty cart"></SectionTitle>;
  }

  return (
    <>
      <SectionTitle text="Shopping cart"></SectionTitle>
      <div className="grid mt-8 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemList cartItems={cartItems}></CartItemList>
        </div>

        <div className="lg:col-span-4">
          <CartTotals cart={currCart}></CartTotals>
        </div>
      </div>
    </>
  );
};

export default page;
