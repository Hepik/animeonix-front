"use client";
import { useEffect, useState } from "react";
import { Container } from "@/components/shared/Container/Container";
import { LoginForm } from "./_components";
import { useRouter, useSearchParams } from "next/navigation";
import { userService } from "@/services/user.service";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activationToken = searchParams.get("activation_token"); // Отримуємо токен з URL

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activationToken) {
      userService
        .verifyActivationToken(activationToken)
        .then(() => {
          window.history.replaceState({}, document.title, "/login");
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [activationToken]);

  return (
    <Container className={"min-h-screen flex items-center justify-center"}>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <LoginForm
          onSubmit={(values) => {
            userService.login(values.username, values.password).then((data) => {
              localStorage.setItem("access_token", data.access_token);

              userService.getCurrentUser().then((userData) => {
                localStorage.setItem("user", JSON.stringify(userData));
                router.replace("/");
              });
            });
          }}
        />
      )}
    </Container>
  );
};

export default LoginPage;
