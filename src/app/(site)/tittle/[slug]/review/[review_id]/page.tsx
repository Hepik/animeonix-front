"use client";

import React, { useState, useEffect } from "react";
import { Container } from "@/components/shared/Container/Container";
import TittleSection from "../_components/TittleSection/TittleSection";
import ReviewSection from "../_components/ReviewSection/ReviewSection";
import { api } from "@/utils/api/api";

export interface Title {
  id: number;
  name: string;
  description: string;
  trailer: string;
  likes: number;
  dislikes: number;
  reviews: number;
  image: string;
  slug: string;
}

export interface Review {
  id: number;
  content: string;
  likes: number;
  dislikes: number;
  title_id: number;
  user_id: number;
}

interface AnouncementPagePropsType {
  params: {
    slug: string;
    review_id: number;
  };
}

const ReviewPage: React.FC<AnouncementPagePropsType> = ({
  params: { slug, review_id },
}) => {
  const [title, setTitle] = useState<Title | null>(null);
  const [review, setReview] = useState<Review | null>(null);

  useEffect(() => {
    const fetchTitles = async ({ slug }: { slug: string }) => {
      const responseTitle = await api.get<Title>(`/titles/${slug}`);
      setTitle(responseTitle.data);
    };
    fetchTitles({ slug });
  }, [slug]);
  useEffect(() => {
    const fetchReviews = async ({ review_id }: { review_id: number }) => {
      const responseReview = await api.get<Review>(`/reviews/${review_id}`);
      setReview(responseReview.data);
    };
    fetchReviews({ review_id });
  }, [review_id]);
  return (
    <div className="flex flex-col space-y-4">
      <Container className="flex flex-col gap-4 flex-1 justify-center py-4 bg-gray-900 rounded-lg border border-black md:justify-start">
        <TittleSection title={title} />
      </Container>
      <Container className="flex flex-col gap-4 flex-1 justify-center py-4 bg-gray-900 rounded-lg border border-black md:justify-start">
        <ReviewSection review={review} />
      </Container>
    </div>
  );
};

export default ReviewPage;
