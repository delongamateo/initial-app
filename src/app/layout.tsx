import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "~/components/Navbar";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Digital App",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} `}
      >
        <TRPCReactProvider>
          <MaxWidthWrapper>
            <Navbar />
            {children}
          </MaxWidthWrapper>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
