"use client";
import { Container } from "@/components/shared/Container/Container";
import { useRouter, useSearchParams } from "next/navigation";
import { userService } from "@/services/user.service";
import { ResetPasswordForm } from "./_components/ResetPasswordForm";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ForgotPasswordPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetPasswordToken = searchParams.get("reset_password_token");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTokenVerified, setIsTokenVerified] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      setLoading(true);
      if (resetPasswordToken) {
        try {
          await userService.verifyResetPasswordToken(resetPasswordToken);
          setIsTokenVerified(true);
        } catch (error: any) {
          setError(error.message || "Failed to verify token.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    verifyToken();
  }, [resetPasswordToken]);

  const handlePasswordReset = async (values: {
    password: string;
    confirmpassword: string;
  }) => {
    if (!isTokenVerified) {
      toast({
        title: "Invalid reset link",
        description:
          "The reset link is invalid or expired. Please try to reset password again",
        variant: "destructive",
      });
      return;
    }

    const { password } = values;
    try {
      await userService.resetPassword(resetPasswordToken!, password);
      toast({
        title: "Password Reset Successful",
        description: "Your password has been reset successfully.",
        variant: "default",
      });
      router.push("/login");
    } catch (error: any) {
      toast({
        title: "Password Reset Failed",
        description: "An error occurred while resetting your password.",
        variant: "destructive",
      });
    }
  };

  return (
    <Container className={"min-h-screen flex items-center justify-center"}>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ResetPasswordForm onSubmit={handlePasswordReset} />
      )}
    </Container>
  );
};

export default ForgotPasswordPage;
