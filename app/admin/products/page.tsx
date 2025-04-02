import EmptyList from "@/components/global/EmptyList";
import { deleteProductAction, fetchAdminProducts } from "@/utils/actions";
import Link from "next/link";

import { formatCurrency } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconButton } from "@/components/form/Button";
import FormContainer from "@/components/form/FormContainer";
import Confirm from "@/components/form/Confirm";

const ProductsPage = async () => {
  const items = await fetchAdminProducts();

  if (items.length === 0) {
    return <EmptyList></EmptyList>;
  }

  return (
    <section className="">
      <Table>
        <TableCaption className="capitalize">
          total product: {items.length}
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Product name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map(({ id, name, company, price }) => {
            return (
              <TableRow key={id}>
                <TableCell>
                  <Link
                    href={`/products/${id}`}
                    className="underline text-muted-foreground tracking-wide capitalize"
                  >
                    {name}
                  </Link>
                </TableCell>

                <TableCell>{company} </TableCell>
                <TableCell>{formatCurrency(price)} </TableCell>
                <TableCell className="flex items-center gap-x-2">
                  <Link href={`/admin/products/${id}/edit`}>
                    <IconButton actionType="edit"></IconButton>
                  </Link>

                  {/* <DeleteProduct productId={id}></DeleteProduct> */}
                  <Confirm productId={id}></Confirm>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
};

const DeleteProduct = ({ productId }: { productId: string }) => {
  const deleteAction = deleteProductAction.bind(null, { productId });
  return (
    <FormContainer action={deleteAction}>
      <IconButton actionType="delete"></IconButton>
    </FormContainer>
  );
};

export default ProductsPage;
