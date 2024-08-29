import React from "react";
import { Container } from "@/components/shared/Container/Container";
import TittleSection from "./_components/TittleSection/TittleSection";

const HomePage = () => {
  return (
    <Container className="flex flex-col gap-4 flex-1 justify-center py-4 bg-gray-900 rounded-lg border border-black md:justify-start">
      <div>
        <TittleSection />
      </div>
    </Container>
  );
};

export default HomePage;
