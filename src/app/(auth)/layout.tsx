import type {Metadata} from "next";
import {AuthLayout as AuthLayoutContainer} from "@/components/layout";

export const metadata: Metadata = {
  title: "Frontend Challenge |  Auth",
  description: "Challenge application",
};

export default function AuthLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <AuthLayoutContainer>
      {children}
    </AuthLayoutContainer>
  );
}
