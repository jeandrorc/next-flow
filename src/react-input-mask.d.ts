declare module 'react-input-mask' {
  import * as React from 'react';

  export interface InputMaskProps extends React.InputHTMLAttributes<HTMLInputElement> {
    mask: string | (string | RegExp)[];
    maskChar?: string | null;
    formatChars?: { [key: string]: string };
    alwaysShowMask?: boolean;
    beforeMaskedValueChange?: (
      newState: { value: string; selection: { start: number; end: number } },
      oldState: { value: string; selection: { start: number; end: number } },
      userInput: string,
      options: InputMaskProps
    ) => { value: string; selection: { start: number; end: number } };
    children?: (inputProps: React.InputHTMLAttributes<HTMLInputElement>) => React.ReactElement;
  }

  const InputMask: React.FC<InputMaskProps>;

  export default InputMask;
}
