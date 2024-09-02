import React from "react";
import { Container } from "@/components/shared/Container/Container";
import TittleSection from "./_components/TittleSection/TittleSection";
import ReviewSection from "./_components/ReviewSection/ReviewSection";

const ReviewPage = () => {
  return (
    <div className="flex flex-col space-y-4">
      <Container className="flex flex-col gap-4 flex-1 justify-center py-4 bg-gray-900 rounded-lg border border-black md:justify-start">
        <TittleSection />
      </Container>
      <Container className="flex flex-col gap-4 flex-1 justify-center py-4 bg-gray-900 rounded-lg border border-black md:justify-start">
        <ReviewSection />
      </Container>
    </div>
  );
};

export default ReviewPage;
