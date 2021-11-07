import React from "react";
import { Select as NSelect, ISelectProps, ISelectItemProps } from "native-base";

import { InputContainer, InputContainerProps } from "@common/components/";

export interface SelectItemProps extends ISelectItemProps {}

export interface SelectProps extends ISelectProps, Omit<InputContainerProps, "children"> {
  value?: ISelectProps["selectedValue"];
  disabled?: ISelectProps["isDisabled"];
  items?: SelectItemProps[];
}

export const Select: React.FC<SelectProps> = ({ label, description, error, items, ...props }) => {
  return (
    <InputContainer label={label} description={description} error={error}>
      <NSelect selectedValue={props.value} {...props}>
        {[{ label: "Seleccionar...", value: null }, ...items].map((item) => (
          <NSelect.Item key={item.value} {...item} />
        ))}
      </NSelect>
    </InputContainer>
  );
};
