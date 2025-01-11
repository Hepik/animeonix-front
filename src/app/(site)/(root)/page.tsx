import React from "react";
import { Container } from "@/components/shared/Container/Container";
import { CarouselHomePage } from "./_components/Carousel/carouselHomePage";
import { TitleList } from "./_components/TitleList/titleList";

const HomePage = () => {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  return (
    <Container className="flex flex-col gap-4 flex-1 justify-center py-4 bg-gray-900 rounded-lg border border-black md:justify-start">
      <CarouselHomePage />
      <div className="flex lg:flex-row">
        <TitleList />
      </div>
    </Container>
  );
};

export default HomePage;
