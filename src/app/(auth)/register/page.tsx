"use client";
import { Container } from "@/components/shared/Container/Container";
import { RegisterForm } from "./_components";
import { useRouter } from "next/navigation";
import { userService } from "@/services/user.service";

const RegisterPage = () => {
  const router = useRouter();

  return (
    <Container className={"min-h-screen flex items-center justify-center"}>
      <RegisterForm
        onSubmit={(values) => {
          userService.register(values.nickname, values.email, values.password);
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
