import React from "react";
import { Input as NInput, IInputProps } from "native-base";

import { InputContainer, InputContainerProps } from "@common/components/";

export interface InputProps extends IInputProps, InputContainerProps {
  disabled?: IInputProps["isDisabled"];
}

export const Input: React.FC<InputProps> = ({ label, description, error, ...props }) => {
  return (
    <InputContainer label={label} description={description} error={error}>
      <NInput {...props} />
    </InputContainer>
  );
};

export default Input;
