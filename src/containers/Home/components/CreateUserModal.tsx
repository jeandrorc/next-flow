"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserForm } from "@/containers/UserRegister/components/UserForm";
import { useUserService } from "@/hooks/useUserService";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/containers/UserRegister/validation";
import { useRegisterEffects } from "@/containers/UserRegister/hooks/useRegisterEffects";
import {z} from "zod";

interface CreateUserModalProps {
  onUserCreated: () => void;
}

export function CreateUserModal(props: CreateUserModalProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { register, loading } = useUserService();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      postalCode: "",
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

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await register(data);
      props.onUserCreated();
      setOpen(false);
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      alert("Erro ao criar usuário.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center gap-2">
          + Adicionar Usuário
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Criar Novo Usuário</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para adicionar um novo usuário.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <UserForm
            form={form}
            onSubmit={handleSubmit}
            loading={loading}
            loadingAddress={loadingAddress}
            hideAuthProps
          />
        </div>

        <DialogFooter>
          {loading && <Spinner />}
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
