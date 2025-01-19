import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider/ThemeProvider";
import { cn } from "@/lib/utils";
import { ClientProvider } from "@/components/shared/ClientProvider/ClientProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
const url_favicon =
  process.env.NEXT_PUBLIC_API_URL + "/static/favicon-32x32.png";

export const metadata: Metadata = {
  title: "Anime Onix",
  description:
    "Your ultimate guide to anime - explore, review, and find your next favorite title.",
  icons: [
    {
      rel: "shortcut icon",
      sizes: "32x32",
      url: url_favicon,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          inter.className,
          "overflow-x-hidden bg-blue-100 dark:bg-gray-800/90"
        )}
      >
        <Suspense>
          <ClientProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Toaster />
              {children}
            </ThemeProvider>
          </ClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
