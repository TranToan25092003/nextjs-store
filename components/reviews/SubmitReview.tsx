"use client";
import { useState } from "react";
import SubmitButton from "@/components/form/Button";
import FormContainer from "@/components/form/FormContainer";
import { Card } from "@/components/ui/card";
import RatingInput from "@/components/reviews/RatingInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { Button } from "@/components/ui/button";
import { createReviewAction } from "@/utils/actions";
import { useUser } from "@clerk/nextjs";

const SubmitReview = ({ productId }: { productId: string }) => {
  const [isReviewFormVisible, setReviewFormVisible] = useState(false);

  const { user } = useUser();

  return (
    <div>
      <Button
        size={"lg"}
        className="capitalize"
        onClick={() => {
          setReviewFormVisible((prev) => {
            return !prev;
          });
        }}
      >
        Leave review
      </Button>

      {isReviewFormVisible && (
        <Card className="mt-8 p-8">
          <FormContainer action={createReviewAction}>
            <input type="hidden" name="productId" value={productId} />
            <input
              type="hidden"
              name="authorName"
              value={user?.firstName || "user"}
            />
            <input type="hidden" name="authorImageUrl" value={user?.imageUrl} />
            <RatingInput name="rating"></RatingInput>
            <TextAreaInput
              name="comment"
              labelText="feedback"
              defaultValue={"Suka blyat product"}
            ></TextAreaInput>

            <SubmitButton className="mt-4" text="Submit"></SubmitButton>
          </FormContainer>
        </Card>
      )}
    </div>
  );
};

export default SubmitReview;
