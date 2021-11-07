import React from "react";
import { Button as NButton, IButtonProps, IconButton as NIconButton, IIconButtonProps } from "native-base";

import { Icon } from "@common/components";

interface CommonButtonProps {
  disabled?: IButtonProps["isDisabled"];
  loading?: IButtonProps["isLoading"];
}

interface DefaultButtonProps extends IButtonProps, CommonButtonProps {
  type?: "default";
  text?: IButtonProps["children"];
}

interface IconButtonProps extends Omit<IIconButtonProps, "icon">, CommonButtonProps {
  type?: "icon";
  icon?: string;
}

export type ButtonProps = IconButtonProps | DefaultButtonProps;

export const Button: React.FC<ButtonProps> = ({ type, ...props }) => {
  if (type === "icon") {
    const { icon, ...rest } = props as IconButtonProps;

    return <NIconButton {...rest} icon={<Icon icon={icon} />} />;
  }

  if (type === "default") {
    const { text, ...rest } = props as DefaultButtonProps;

    return <NButton children={text} {...rest} />;
  }
};

Button.defaultProps = { type: "default" };

export default Button;
