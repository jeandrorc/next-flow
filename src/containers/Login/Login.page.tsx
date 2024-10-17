"use client";

import React, {useState} from "react";
import {Container} from "@/components/layout/Container";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Separator,
} from "@/components/ui";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import Link from "next/link";
import {TextInput} from "@/components/form";
import {ProgressBar} from "@/components/ui/progress-bar";
import {FiLock, FiMail} from "react-icons/fi";
import {motion} from "framer-motion";
import {useAuth} from "@/hooks/useAuth"; // Importando animações

const formSchema = z.object({
  email: z.string().email("Informe um email válido").max(50),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").max(50),
});

export function LoginPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {login, loading} = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    login(data.email, data.password)
      .then(() => {
        setIsSuccess(true);
      })
      .catch((error) => {
        console.log("Erro no login:", error);
      });
  };

  if (isSuccess) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center min-h-full">
          <Card className="w-full max-w-sm overflow-hidden shadow-lg p-20">
            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5}}
              className="flex flex-col items-center space-y-4"
            >
              <h1 className="text-2xl font-semibold">Login efetuado com
                sucesso!</h1>
              <p className="text-gray-500">Você será redirecionado para a home
                em instantes.</p>
              <ProgressBar/>
            </motion.div>
          </Card>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-sm"
          >
            <Card className="w-full overflow-hidden shadow-lg">
              {loading && <ProgressBar/>}
              <CardHeader className="text-center">
                <h1 className="text-2xl font-semibold">Bem-vindo de volta!</h1>
                <p className="text-gray-500">Entre com sua conta</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <TextInput
                  form={form}
                  name="email"
                  label="Email"
                  placeholder="Digite seu email"
                  appendInnerLeft={<FiMail/>}
                />
                <TextInput
                  form={form}
                  name="password"
                  label="Senha"
                  placeholder="Digite sua senha"
                  type="password"
                  appendInnerLeft={<FiLock/>}
                />
                <div className="text-right">
                  <Link
                    href="/recuperar-senha"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button className="w-full" type="submit">
                  Entrar
                </Button>
                <Separator/>
                <div className="text-center">
                  <span>Não tem uma conta?</span>
                </div>
                <Link href="/cadastro">
                  <Button className="w-full" variant="outline">
                    Criar conta
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
