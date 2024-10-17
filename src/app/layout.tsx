import type {Metadata} from "next";
import "./globals.css";
import {Providers} from "@/store";

export const metadata: Metadata = {
  title: "NextFlow",
  description: "Challenge application",
};

export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <Providers>
      {children}
    </Providers>
  );
}
