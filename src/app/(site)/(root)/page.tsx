import React from "react";
import { Container } from "@/components/shared/Container/Container";
import { CarouselHomePage } from "./_components/Carousel/carouselHomePage";
import { ReviewList } from "./_components/ReviewList/reviewList";

const HomePage = () => {
  return (
    <Container className="flex flex-col gap-4 flex-1 justify-center py-4 bg-gray-900 rounded-lg border border-black md:justify-start">
      <CarouselHomePage />
      <div className="flex flex-col lg:flex-row gap-4">
        <ReviewList />
      </div>
    </Container>
  );
};

export default HomePage;
