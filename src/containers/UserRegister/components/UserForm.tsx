"use client";

import React from "react";
import { UseFormReturn, SubmitHandler } from "react-hook-form";
import { Form } from "@/components/ui/form";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  HBox,
  Separator,
  Spinner,
} from "@/components/ui";
import { TextInput } from "@/components/form";
import Link from "next/link";
import { ProgressBar } from "@/components/ui/progress-bar";
import { FiHash, FiLock, FiMail, FiMapPin, FiUser } from "react-icons/fi";

interface UserFormValues {
  fullName: string;
  email: string;
  cep: string;
  city: string;
  state: string;
  street: string;
  number: string;
  neighborhood: string;
  password: string;
  passwordConfirmation: string;
}

export interface UserFormProps {
  onSubmit: SubmitHandler<UserFormValues>;
  form: UseFormReturn<UserFormValues>;
  loadingAddress: boolean;
  loading: boolean;
  hideAuthProps?: boolean;
}

export function UserForm({
                           onSubmit,
                           form,
                           loadingAddress,
                           loading,
                           hideAuthProps = false,
                         }: UserFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-lg"
        aria-labelledby="form-title"
      >
        <Card className="overflow-hidden shadow-lg">
          {loading && <ProgressBar />}
          <CardHeader className="text-center">
            {!hideAuthProps && (
              <>
                <h1 id="form-title" className="text-2xl font-bold">
                  Criar minha conta
                </h1>
                <p className="text-gray-500">
                  Preencha os campos abaixo para continuar
                </p>
              </>
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            <TextInput
              form={form}
              name="fullName"
              label="Nome completo"
              placeholder="Digite seu nome"
              appendInnerLeft={<FiUser />}
              aria-required="true"
            />
            <TextInput
              form={form}
              name="email"
              label="Email"
              placeholder="Digite seu email"
              appendInnerLeft={<FiMail />}
              type="email"
              aria-required="true"
            />

            <Separator orientation="horizontal" className="my-2" />

            <HBox>
              <TextInput
                form={form}
                name="cep"
                label="CEP"
                placeholder="Digite seu CEP"
                mask="99999-999"
                appendInnerLeft={<FiMapPin />}
                appendInnerRight={<Spinner hide={!loadingAddress} />}
                aria-describedby="cep-loading"
              />
              <div id="cep-loading" className="sr-only" aria-live="polite">
                {loadingAddress ? "Carregando endereço..." : ""}
              </div>
            </HBox>

            <HBox>
              <TextInput
                className="flex-1"
                form={form}
                readOnly
                name="city"
                label="Cidade"
                placeholder="Informe a cidade"
              />
              <TextInput
                form={form}
                readOnly
                name="state"
                label="Estado"
                placeholder="Informe o estado"
              />
            </HBox>

            <HBox>
              <TextInput
                className="flex-1"
                readOnly
                form={form}
                name="street"
                label="Rua"
                placeholder="Informe a rua"
              />
              <TextInput
                form={form}
                name="number"
                label="Número"
                placeholder="Informe o número"
                appendInnerLeft={<FiHash />}
                aria-required="true"
              />
            </HBox>

            <TextInput
              readOnly
              form={form}
              name="neighborhood"
              label="Bairro"
              placeholder="Informe o bairro"
            />

            <Separator orientation="horizontal" className="my-2" />

            <TextInput
              form={form}
              name="password"
              label="Senha"
              placeholder="Digite sua senha"
              type="password"
              appendInnerLeft={<FiLock />}
              aria-required="true"
            />
            <TextInput
              form={form}
              name="passwordConfirmation"
              label="Confirmação de senha"
              placeholder="Confirme sua senha"
              type="password"
              appendInnerLeft={<FiLock />}
              aria-required="true"
            />
          </CardContent>

          {!hideAuthProps && (
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" type="submit" aria-label="Criar conta">
                Criar conta
              </Button>
              <Link href="/login" className="w-full">
                <Button
                  variant="link"
                  className="w-full"
                  aria-label="Ir para o login"
                >
                  Já tenho cadastro
                </Button>
              </Link>
            </CardFooter>
          )}
        </Card>
      </form>
    </Form>
  );
}
