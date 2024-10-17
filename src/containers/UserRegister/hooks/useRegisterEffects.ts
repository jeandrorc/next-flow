import { useEffect } from "react";
import { useAddress } from "@/hooks/useAddress";
import { UseFormReturn, FieldValues } from "react-hook-form";

interface RegisterFormValues extends FieldValues {
  postalCode: string;
  city: string;
  state: string;
  street: string;
  neighborhood: string;
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  number: string;
}

export function useRegisterEffects(form: UseFormReturn<RegisterFormValues>) {
  const cepWatch = form.watch("postalCode");
  const { address, searchAddress, loading, error } = useAddress();

  useEffect(() => {
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
    if (cepRegex.test(cepWatch)) {
      searchAddress(cepWatch);
    }
  }, [cepWatch, searchAddress]);

  useEffect(() => {
    if (error) {
      form.setError("postalCode", { type: "manual", message: error });
    }
  }, [error, form]);

  useEffect(() => {
    if (!address) return;
    form.setValue("city", address.localidade || "");
    form.setValue("state", address.uf || "");
    form.setValue("street", address.logradouro || "");
    form.setValue("neighborhood", address.bairro || "");
  }, [address, form]);

  return { loading };
}
