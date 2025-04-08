import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import Rating from "./Rating";
import Comment from "./Comment";

type ReviewCardProps = {
  reviewInfo: {
    comment: string;
    rating: number;
    name: string;
    image: string;
  };
  children?: React.ReactNode;
};

const ReviewsCard = ({ reviewInfo, children }: ReviewCardProps) => {
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center">
          <Image
            src={reviewInfo.image}
            alt={reviewInfo.name}
            className="w-12 h-12 rounded-full object-cover"
            width={48}
            height={49}
          ></Image>
          <div className="ml-4">
            <h3 className="text-sm font-bold capitalize mb-1">
              {reviewInfo.name}
            </h3>
            <Rating rating={reviewInfo.rating}></Rating>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Comment comment={reviewInfo.comment}></Comment>
      </CardContent>

      <div className="absolute top-3 right-3">{children}</div>
    </Card>
  );
};

export default ReviewsCard;
