import { FaStar, FaRegStar } from "react-icons/fa";

const Rating = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    return index + 1 <= rating;
  });

  return (
    <div className="flex items-center gap-x-1">
      {stars.map((isFilled, i) => {
        const className = `w-3 h-3 ${
          isFilled ? "text-primary" : "text-secondary"
        }`;
        return isFilled ? (
          <FaStar className={className} key={i}></FaStar>
        ) : (
          <FaRegStar className={className} key={i}></FaRegStar>
        );
      })}
    </div>
  );
};

export default Rating;
