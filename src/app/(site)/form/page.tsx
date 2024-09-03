import React from "react";
import { Container } from "@/components/shared/Container/Container";
import FormTittle from "./_components/FormTittle/FormTittle";
import FormInput from "./_components/FormInput/FormInput";

const ReviewPage = () => {
  return (
    <Container className="flex flex-col gap-2 py-4 bg-gray-900 rounded-lg border border-black md:justify-start">
      <div>
        <FormTittle />
      </div>
      <div>
        <FormInput />
      </div>
    </Container>
  );
};

export default ReviewPage;
