"use client";
import { Container } from "@/components/shared/Container/Container";
import { useRouter } from "next/navigation";
import { userService } from "@/services/user.service";
import { ForgotPasswordForm } from "./_components/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  const router = useRouter();

  return (
    <Container className={"min-h-screen flex items-center justify-center"}>
      <ForgotPasswordForm
        onSubmit={(values) => {
          userService.sendResetPasswordEmail(values.email);
          try {
            router.replace("/login/forgot-password/confirm");
          } catch (e) {
            router.refresh();
          }
        }}
      />
    </Container>
  );
};

export default ForgotPasswordPage;
