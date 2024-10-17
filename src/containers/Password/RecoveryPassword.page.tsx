"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/Container";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Separator,
} from "@/components/ui";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { TextInput } from "@/components/form";
import { ProgressBar } from "@/components/ui/progress-bar";
import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";
import Link from "next/link";
import {usePasswordService} from "@/hooks";

const formSchema = z.object({
  email: z.string().email("Informe um email válido").max(50),
});

export function RecoveryPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { requestRecovery, loading } = usePasswordService();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    requestRecovery(data.email)
      .then(() => {
        setIsSuccess(true); // Exibe a mensagem de sucesso
        setTimeout(() => {
          router.push("/auth/login"); // Redireciona para login após 3 segundos
        }, 3000);
      })
      .catch((error) => {
        console.log("Erro ao enviar email de recuperação:", error);
      });
  };

  if (isSuccess) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center min-h-full">
          <Card className="w-full max-w-sm overflow-hidden shadow-lg p-20">
            <motion.div
              initial={{opacity: 0, y: -50}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: 50}}
              transition={{duration: 0.5}}
              className="flex flex-col items-center justify-center text-gray-800"
            >
              <h1 className="text-2xl font-bold">Email enviado com sucesso!</h1>
              <p className="text-lg mt-2">Verifique sua caixa de entrada.</p>
              <ProgressBar className="mt-4"/>
            </motion.div>
          </Card>
        </div>
      </Container>

    );
  }

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-sm"
            aria-labelledby="form-title"
          >
            <Card className="w-full overflow-hidden shadow-lg">
              {loading && <ProgressBar/>}
              <CardHeader className="text-center">
                <h1 id="form-title" className="text-2xl font-semibold">
                  Recuperar Senha
                </h1>
                <p className="text-gray-500">
                  Informe seu email para receber o link de recuperação
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <TextInput
                  form={form}
                  name="email"
                  label="Email"
                  placeholder="Digite seu email"
                  appendInnerLeft={<FiMail />}
                />
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button className="w-full" type="submit" aria-label="Recuperar senha">
                  Enviar
                </Button>
                <Separator />
                <Link href="/auth/login" className="w-full">
                  <Button className="w-full" variant="outline" aria-label="Voltar ao login">
                    Voltar ao login
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </Container>
  );
}
