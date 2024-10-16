"use client";

import React, { useEffect, useState } from "react";
import { Container } from "@/components/shared/Container/Container";
import TittleSection from "../_components/TittleSection/TittleSection";
import ReviewsSection from "../_components/ReviewsSection/ReviewsSection";
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

interface AnouncementPagePropsType {
  params: {
    slug: string;
  };
}

const TittlePage: React.FC<AnouncementPagePropsType> = ({
  params: { slug },
}) => {
  const [title, setTitle] = useState<Title | null>(null);

  useEffect(() => {
    const fetchReviews = async ({ slug }: { slug: string }) => {
      const response = await api.get<Title>(`/titles/${slug}`);
      setTitle(response.data);
    };
    fetchReviews({ slug });
  }, [slug]);
  return (
    <div className="flex flex-col space-y-4">
      <Container className="flex flex-col gap-4 flex-1 justify-center py-4 bg-gray-900 rounded-lg border border-black md:justify-start">
        <TittleSection slug={slug} />
      </Container>
      <Container className="flex flex-col gap-4 flex-1 justify-center py-4 bg-gray-900 rounded-lg border border-black md:justify-start">
        <ReviewsSection data={title} />
      </Container>
    </div>
  );
};

export default TittlePage;
