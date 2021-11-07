import React from "react";
import { TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";

export interface TouchableProps extends TouchableOpacityProps {}

export const Touchable: React.FunctionComponent<TouchableProps> = ({ children, style, ...props }) => {
  return (
    <TouchableOpacity {...props} style={[{ pointer: "cursor" } as ViewStyle, style]}>
      {children}
    </TouchableOpacity>
  );
};
