import { Container } from "@/components/shared/Container/Container";

const ConfirmEmailPage = () => {
  return (
    <Container className="flex flex-col min-h-screen items-center justify-center">
      <p className="font-bold text-xl">
        We sent confirmation message on your email.
      </p>
      <p className="font-bold text-xl mt-3">Confirm your email.</p>
    </Container>
  );
};

export default ConfirmEmailPage;
