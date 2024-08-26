"use client";

import { ReviewListItem } from "../ReviewListItem/reviewListItem";

export const ReviewList = () => {
  return (
    <div className="max-w-[1200px]">
      <ReviewListItem />
      <ReviewListItem />
      <ReviewListItem />
    </div>
  );
};
