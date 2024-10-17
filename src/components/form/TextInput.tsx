"use client";

import { ReactNode } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InputMask from "react-input-mask";
import { UseFormReturn, FieldValues, ControllerRenderProps, Path } from "react-hook-form";

interface CustomFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  appendInnerLeft?: ReactNode;
  appendInnerRight?: ReactNode;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  mask?: string;
}

export function TextInput<T extends FieldValues>({
                                                   form,
                                                   name,
                                                   label,
                                                   placeholder = "",
                                                   type = "text",
                                                   appendInnerLeft,
                                                   appendInnerRight,
                                                   className,
                                                   disabled,
                                                   readOnly,
                                                   mask,
                                                 }: CustomFormFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<T, Path<T>> }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative flex items-center">
              {appendInnerLeft && <div className="absolute left-2">{appendInnerLeft}</div>}
              {mask ? (
                <InputMask
                  mask={mask}
                  value={field.value as string}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                >
                  {(inputProps) => (
                    <div>
                      <Input
                        {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
                        type={type}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        className={`w-full ${appendInnerLeft ? "pl-10" : ""} ${
                          appendInnerRight ? "pr-10" : ""
                        }`}
                        disabled={disabled}
                      />
                    </div>
                  )}
                </InputMask>
              ) : (
                <Input
                  {...field}
                  type={type}
                  readOnly={readOnly}
                  placeholder={placeholder}
                  className={`w-full ${appendInnerLeft ? "pl-10" : ""} ${
                    appendInnerRight ? "pr-10" : ""
                  }`}
                  disabled={disabled}
                />
              )}
              {appendInnerRight && <div className="absolute right-2">{appendInnerRight}</div>}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
