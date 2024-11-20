"use client";
import { Container } from "@/components/shared/Container/Container";
import { LoginForm } from "./_components";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

const LoginPage = () => {
  const router = useRouter();

  return (
    <Container className={"min-h-screen flex items-center justify-center"}>
      <LoginForm
        onSubmit={(values) => {
          authService.login(values.username, values.password).then((data) => {
            localStorage.setItem("access_token", data.access_token);

            authService.getCurrentUser().then((userData) => {
              localStorage.setItem("user", JSON.stringify(userData));
              router.replace("/");
            });
          });
        }}
      />
    </Container>
  );
};

export default LoginPage;
