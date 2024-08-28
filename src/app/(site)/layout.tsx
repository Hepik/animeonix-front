import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import React from "react";

interface RootLayoutPropsType {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutPropsType> = ({ children }) => {
  return (
    <div
      className="flex flex-col min-h-screen justify-center max-w-[1400px] mx-auto px-4 "
      suppressHydrationWarning
    >
      <Header />
      <main className="flex-1 py-4">{children}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;
