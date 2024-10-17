import type {Metadata} from "next";
import {Layout} from "@/components/layout";
import {AuthGuard} from "@/components/pages";

export const metadata: Metadata = {
  title: "NextFlow",
  description: "Challenge application",
};

export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <AuthGuard>
      <Layout>
        {children}
      </Layout>
    </AuthGuard>
  );
}
