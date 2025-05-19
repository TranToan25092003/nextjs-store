"use server";

import db from "@/utils/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  imageSchema,
  productSchema,
  reviewSchema,
  validateWithZodSchema,
} from "./schema";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";
import { Cart } from "@prisma/client";

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
  await getAdminUser();

  const image = formData.get("image") as File;

  const productId = formData.get("id") as string;

  const oldImage = formData.get("url") as string;

  try {
    const validateFile = validateWithZodSchema(imageSchema, {
      image: image,
    });

    const fullPath = await uploadImage(validateFile.image);

    await deleteImage(oldImage);

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        image: fullPath,
      },
    });

    revalidatePath(`/admin/products/${productId}/edit`);

    return {
      message: "Update successfully",
    };
  } catch (error) {
    return renderError(error);
  }

  return {
    message: "",
  };
};

/**
 * ====================================
 * toggle favorite
 * ====================================
 */
export const toggleFavoriteAction = async (prevState: {
  productId: string;
  favoriteId: string | null;
  pathName: string;
}) => {
  const user = await getAuthUser();

  const { productId, favoriteId, pathName } = prevState;

  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          productId: productId,
          clerkId: user.id,
        },
      });
    }

    revalidatePath(pathName);

    return {
      message: favoriteId ? "removed from faves" : "added to faves",
    };
  } catch (error) {
    return renderError(error);
  }
};

/**
 * ====================================
 * fetch favorite id
 * ====================================
 */
export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getAuthUser();

  const favorite = await db.favorite.findFirst({
    where: {
      productId: productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  });

  console.log(favorite);

  return favorite?.id || null;
};

/**
 * ====================================
 * fetch user favorite
 * ====================================
 */

export const fetchUserFavorites = async () => {
  const user = await getAuthUser();

  const favorites = await db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });

  return favorites;
};

/**
 * ====================================
 * review actions
 * ====================================
 */
export const createReviewAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);

    const validateFields = validateWithZodSchema(reviewSchema, rawData);

    await db.review.create({
      data: {
        ...validateFields,
        clerkId: user.id,
      },
    });

    revalidatePath(`/products/${validateFields.productId}`);

    return {
      message: "review submitted successfully",
    };
  } catch (error) {
    return renderError(error);
  }
  return {
    message: "",
  };
};

/**
 * ====================================
 * fetch product reviews
 * ====================================
 */
export const fetchProductReviews = async (productId: string) => {
  const reviews = await db.review.findMany({
    where: {
      productId: productId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reviews;
};

/**
 * ====================================
 * fetch product rating
 * ====================================
 */
export const fetchProductRating = async (productId: string) => {
  const result = await db.review.groupBy({
    by: ["productId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      productId,
    },
  });

  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    count: result[0]?._count.rating ?? 0,
  };
};

/**
 * ====================================
 * get review by user
 * ====================================
 */
export const fetchProductReviewsByUser = async () => {
  const user = await getAuthUser();

  const reviews = await db.review.findMany({
    where: {
      clerkId: user.id,
    },
    select: {
      rating: true,
      comment: true,
      id: true,
      product: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });

  return reviews;
};

/**
 * ====================================
 * delete reviews
 * ====================================
 */
export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState;

  const user = await getAuthUser();

  try {
    await db.review.delete({
      where: {
        id: reviewId,
        clerkId: user.id,
      },
    });

    revalidatePath("/reviews");

    return {
      message: "Review deleted successfully",
    };
  } catch (error) {
    return renderError(error);
  }
};

/**
 * ====================================
 * find exist reviews
 * ====================================
 */
export const findExistReviews = async (userId: string, productId: string) => {
  return db.review.findFirst({
    where: {
      clerkId: userId,
      productId: productId,
    },
  });
};

/**
 * ====================================
 * Cart actions
 * ====================================
 */
export const fetchCartItems = async () => {
  const { userId } = await auth();

  const cart = await db.cart.findFirst({
    where: {
      clerkId: userId ?? "",
    },
    select: {
      numItemsInCart: true,
    },
  });

  return cart?.numItemsInCart || 0;
};

const fetchProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const updateOrCreateCartItem = async ({
  productId,
  cartId,
  amount,
}: {
  productId: string;
  cartId: string;
  amount: number;
}) => {
  let cartItems = await db.cartItem.findFirst({
    where: {
      productId: productId,
      cartId: cartId,
    },
  });

  if (cartItems) {
    cartItems = await db.cartItem.update({
      where: {
        id: cartItems.id,
      },
      data: {
        amount: cartItems.amount + amount,
      },
    });
  } else {
    cartItems = await db.cartItem.create({
      data: {
        amount: amount,
        productId: productId,
        cartId: cartId,
      },
    });
  }
};

const includeProductClause = {
  cartItems: {
    include: {
      product: true,
    },
  },
};

export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string;
  errorOnFailure?: boolean;
}) => {
  let cart = await db.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: includeProductClause,
  });

  if (!cart && errorOnFailure) {
    throw new Error("cart not found");
  }

  if (!cart) {
    cart = await db.cart.create({
      data: {
        clerkId: userId,
      },
      include: includeProductClause,
    });
  }

  return cart;
};

export const updateCart = async (cart: Cart) => {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  let numItemsInCart = 0;
  let cartTotal = 0;

  for (const item of cartItems) {
    numItemsInCart += item.amount;
    cartTotal += item.amount * item.product.price;
  }

  const tax = cart.taxRate * cartTotal;

  const shipping = cartTotal ? cart.shipping : 0;

  const orderTotal = cartTotal + tax + shipping;

  const currCart = await db.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      numItemsInCart: numItemsInCart,
      cartTotal: cartTotal,
      tax: tax,
      orderTotal: orderTotal,
    },
    include: includeProductClause,
  });

  return { cartItems, currCart };
};

export const addToCartAction = async (prevState: any, formData: FormData) => {
  try {
    const user = await getAuthUser();

    const productId = formData.get("productId") as string;
    const amount = formData.get("amount");

    await fetchProduct(productId);

    const cart = await fetchOrCreateCart({
      userId: user.id,
    });

    await updateOrCreateCartItem({
      cartId: cart.id,
      productId: productId,
      amount: Number(amount),
    });

    await updateCart(cart);
  } catch (error) {
    return renderError(error);
  }



  return {
    message: "Add to cart success",
  };
};

export const removeCartItemAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();

  try {
    const cartItemId = formData.get("id") as string;

    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });

    await db.cartItem.delete({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    });

    await updateCart(cart);

    revalidatePath("/cart");

    return { message: "Item removed from cart" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateCartItemAction = async ({
  amount,
  cartItemId,
}: {
  amount: number;
  cartItemId: string;
}) => {
  const user = await getAuthUser();

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });

    await db.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
      data: {
        amount,
      },
    });

    await updateCart(cart);

    revalidatePath("/cart");

    return {
      message: "cart updated",
    };
  } catch (error) {
    return renderError(error);
  }
};

export const createOrderAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();

  let orderId: null | string = null;

  let cartId: null | string = null;

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });

    cartId = cart.id;

    // remove all order is unpaid of customer
    await db.order.deleteMany({
      where: {
        clerkId: user.id,
        isPaid: false,
      },
    });

    const order = await db.order.create({
      data: {
        clerkId: user.id,
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
        email: user?.emailAddresses[0].emailAddress,
      },
    });

    orderId = order.id;
  } catch (error) {
    return renderError(error);
  }

  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`);
};

export const fetchUserOrders = async () => {
  const user = await getAuthUser();

  const orders = await db.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

export const fetchAdminOrders = async () => {
  await getAdminUser();

  const orders = await db.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};
