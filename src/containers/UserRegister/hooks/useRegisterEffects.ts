import { useEffect } from "react";
import { useAddress } from "@/hooks/useAddress";
import { UseFormReturn, FieldValues } from "react-hook-form";

export function useRegisterEffects<T extends FieldValues>(form: UseFormReturn<T>) {
  const cepWatch = form.watch("cep") as string;
  const { address, searchAddress, loading, error } = useAddress();

  useEffect(() => {
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
    if (cepRegex.test(cepWatch)) {
      searchAddress(cepWatch);
    }
  }, [cepWatch, searchAddress]);

  useEffect(() => {
    if (error) {
      form.setError("cep", { type: "manual", message: error });
    }
  }, [error, form]);

  useEffect(() => {
    form.setValue("city", address.localidade || "");
    form.setValue("state", address.uf || "");
    form.setValue("street", address.logradouro || "");
    form.setValue("neighborhood", address.bairro || "");
  }, [address, form]);

  return { loading };
}
