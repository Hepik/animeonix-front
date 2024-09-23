"use client";
import { Container } from "@/components/shared/Container/Container";
import { LoginForm } from "./_components";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  return (
    <Container className={"min-h-screen flex items-center justify-center"}>
      <LoginForm
        onSubmit={() => {
          console.log("Submited!");
        }}
      />
    </Container>
  );
};

export default LoginPage;
