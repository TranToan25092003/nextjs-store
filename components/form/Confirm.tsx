// DeleteButton.tsx (Client Component)
"use client";
import Swal from "sweetalert2";

import { deleteProductAction } from "@/utils/actions";
import FormContainer from "./FormContainer";
import { IconButton } from "./Button";

const Confirm = ({ productId }: { productId: string }) => {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Sure?",
      text: "This product will be delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      // Nếu người dùng xác nhận, gọi Server Action
      const boundDeleteProduct = deleteProductAction.bind(null, { productId });

      Swal.fire("Deleted!", "Product deleted", "success");

      return await boundDeleteProduct(); // Thực thi action
    } else {
      return {
        message: "",
      };
    }
  };

  return (
    <FormContainer action={handleDelete}>
      <IconButton actionType="delete"></IconButton>
    </FormContainer>
  );
};

export default Confirm;
