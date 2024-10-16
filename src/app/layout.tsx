import type { Metadata } from "next";
import "./globals.css";
import {Layout} from "@/components/layout";


export const metadata: Metadata = {
  title: "Movies",
  description: "Challenge application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout>
        {children}
    </Layout>
  );
}
