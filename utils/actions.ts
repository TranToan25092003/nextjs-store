"use server";

import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { imageSchema, productSchema, validateWithZodSchema } from "./schema";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";

/**
 * ====================================
 * helper functions
 * ====================================
 */
const getAuthUser = async () => {
  const user = await currentUser();

  if (!user) redirect("/");

  return user;
};

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "An error occurred",
  };
};

const getAdminUser = async () => {
  const user = await getAuthUser();

  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");

  return user;
};

/**
 * ====================================
 * fetch featured products
 * ====================================
 */
export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });

  return products;
};

/**
 * ====================================
 * get all products
 * ====================================
 */

export const fetchAllProducts = async ({ search = "" }: { search: string }) => {
  try {
    return await db.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },

          {
            company: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * ====================================
 * get products
 * ====================================
 */
export const fetchSingleProduct = async (productId: string) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return redirect("/products");
    }

    return product;
  } catch (error) {
    console.log(error);
  }
};

/**
 * ====================================
 * create product
 * ====================================
 */
export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const file = formData.get("image") as File;

    const rawData = Object.fromEntries(formData);

    const validatedFields = validateWithZodSchema(productSchema, rawData);

    const validateFile = validateWithZodSchema(imageSchema, {
      image: file,
    });

    const fullPath = await uploadImage(validateFile.image);

    await db.product.create({
      data: { ...validatedFields, image: fullPath, clerkId: user.id },
    });
  } catch (error) {
    return renderError(error);
  }

  redirect("/admin/products");
};

/**
 * ====================================
 * get admin products
 * ====================================
 */
export const fetchAdminProducts = async () => {
  await getAdminUser();

  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
};

/**
 * ====================================
 * delete product action
 * ====================================
 */
export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState;

  await getAdminUser();

  try {
    const product = await db.product.delete({
      where: {
        id: productId,
      },
    });

    await deleteImage(product.image);

    revalidatePath("/admin/products");

    return {
      message: "product removed",
    };
  } catch (error) {
    return renderError(error);
  }
};

/**
 * ====================================
 * fetch admin product details
 * ====================================
 */
export const fetchAdminProductDetails = async (productId: string) => {
  await getAdminUser();

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) redirect("/admin/products");

  return product;
};

/**
 * ====================================
 * update product
 * ====================================
 */
export const updateProductAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAdminUser();

  try {
    const productId = formData.get("id") as string;

    const rawData = Object.fromEntries(formData);

    const validatedFields = validateWithZodSchema(productSchema, rawData);

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        ...validatedFields,
      },
    });

    revalidatePath(`/admin/products/${productId}/edit`);
    return {
      message: "update success",
    };
  } catch (error) {
    return renderError(error);
  }
};

/**
 * ====================================
 * update product image
 * ====================================
 */
export const updateImageProductAction = async (
  prevState: any,
  formData: FormData
) => {
  return {
    message: "Product image update successfully",
  };
};
