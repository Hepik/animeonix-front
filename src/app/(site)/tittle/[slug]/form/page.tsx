"use client";

import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Container } from "@/components/shared/Container/Container";
import FormTittle from "./_components/FormTittle/FormTittle";
import FormInput from "./_components/FormInput/FormInput";
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

const ReviewPage: React.FC<AnouncementPagePropsType> = ({
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

  const { mutateAsync: addReview } = useMutation({
    mutationKey: ["titleId"],
    mutationFn: (content: string) =>
      api.post(`/reviews/${title?.id}`, { content, title_id: title?.id }),
  });

  const handleTitleInputSubmit = (content: string) => {
    addReview(content);
  };
  return (
    <Container className="flex flex-col gap-2 py-4 bg-gray-900 rounded-lg border border-black md:justify-start">
      <div>
        <FormTittle data={title} />
      </div>
      <div>
        <FormInput onSubmit={handleTitleInputSubmit} />
      </div>
    </Container>
  );
};

export default ReviewPage;
