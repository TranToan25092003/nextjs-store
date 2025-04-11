import { deleteReviewAction, fetchProductReviewsByUser } from "@/utils/actions";
import SectionTitle from "@/components/global/SectionTitle";
import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/Button";
import ReviewsCard from "@/components/reviews/ReviewsCard";

const DeleteReview = async ({ reviewId }: { reviewId: string }) => {
  const deleteReview = deleteReviewAction.bind(null, { reviewId });

  return (
    <FormContainer action={deleteReview}>
      <IconButton actionType="delete"></IconButton>
    </FormContainer>
  );
};

const ReviewsPage = async () => {
  const reviews = await fetchProductReviewsByUser();

  if (reviews.length == 0) {
    return <SectionTitle text="You have no reviews yet"></SectionTitle>;
  }

  return (
    <>
      <SectionTitle text="Your reviews"></SectionTitle>
      <section className="grid md:grid-cols-2 gap-8 mt-4">
        {reviews.map(({ id, comment, product, rating }) => {
          const { image, name } = product;

          const reviewInfo = {
            image,
            name,
            comment,
            rating,
          };

          return (
            <ReviewsCard key={id} reviewInfo={reviewInfo}>
              <DeleteReview reviewId={id}></DeleteReview>
            </ReviewsCard>
          );
        })}
      </section>
    </>
  );
};

export default ReviewsPage;
