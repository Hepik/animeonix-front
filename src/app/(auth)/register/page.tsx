"use client";
import { Container } from "@/components/shared/Container/Container";
import { RegisterForm } from "./_components";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();

  return (
    <Container className={"min-h-screen flex items-center justify-center"}>
      <RegisterForm
        onSubmit={() => {
          try {
            router.replace("/register/confirm");
          } catch (e) {
            router.refresh();
          }
        }}
      />
    </Container>
  );
};

export default RegisterPage;
