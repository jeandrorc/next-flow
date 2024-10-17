"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from "@/components/layout/Container";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/containers/UserRegister/validation";
import { useRegisterEffects } from "@/containers/UserRegister/hooks/useRegisterEffects";
import { UserForm } from "@/containers/UserRegister/components/UserForm";
import { useUserService } from "@/hooks/useUserService";
import { ProgressBar } from "@/components/ui/progress-bar";
import { motion } from "framer-motion";

export function UserRegisterPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      cep: "",
      street: "",
      number: "",
      city: "",
      state: "",
      neighborhood: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const { loading: loadingAddress } = useRegisterEffects(form);
  const { loading, register } = useUserService();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await register(data);
      setIsSuccess(true);
      setErrorMessage(null);

      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <Container>
      <div className="flex flex-col items-center justify-center">
        {isSuccess ? (
          <motion.div
            initial={{scale: 0.8, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            exit={{scale: 0.8, opacity: 0}}
            transition={{duration: 0.5}}
            className="p-4 bg-white text-green-600 rounded-md"
          >
            <h1 className="text-xl font-bold">Usuário criado com sucesso!</h1>
            <p>Redirecionando para a página de login...</p>
            <ProgressBar/>
          </motion.div>
        ) : (
          <>
            <UserForm
              form={form}
              onSubmit={onSubmit}
              loadingAddress={loadingAddress}
              loading={loading}
            />
            {errorMessage && (
              <motion.div
                initial={{opacity: 0, y: -10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -10}}
                transition={{duration: 0.3}}
                className="mt-4 p-3 bg-red-500 text-white rounded-md"
              >
                {errorMessage}
              </motion.div>
            )}
          </>
        )}
      </div>
    </Container>
  );
}
