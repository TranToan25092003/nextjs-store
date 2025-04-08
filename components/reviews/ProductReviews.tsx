import { fetchProductReviews } from "@/utils/actions";
import React from "react";
import SectionTitle from "../global/SectionTitle";
import ReviewsCard from "./ReviewsCard";

const ProductReviews = async ({ productId }: { productId: string }) => {
  const reviews = await fetchProductReviews(productId);

  return (
    <div className="mt-16 ">
      <SectionTitle text="product reviews"></SectionTitle>
      <div className="grid md:grid-cols-2 gap-8 my-8">
        {reviews.map(({ authorImageUrl, authorName, comment, rating, id }) => {
          const reviewInfo = {
            comment,
            rating,
            image: authorImageUrl,
            name: authorName,
          };

          return <ReviewsCard key={id} reviewInfo={reviewInfo}></ReviewsCard>;
        })}
      </div>
    </div>
  );
};

export default ProductReviews;
