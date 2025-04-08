"use client";

import { useState } from "react";
import { Button } from "../ui/button";

const Comment = ({ comment }: { comment: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const longComment = comment.length > 130;

  const displayComment =
    longComment && !isExpanded ? `${comment.slice(0, 130)}` : comment;

  return (
    <p className="text-sm">
      {displayComment}

      {longComment && (
        <Button
          variant={"link"}
          className="pl-0 text-muted-foreground capitalize"
          onClick={toggleExpanded}
        >
          {isExpanded ? "show less" : "show more"}
        </Button>
      )}
    </p>
  );
};

export default Comment;
