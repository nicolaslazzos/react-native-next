import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { TextStyle, StyleProp } from "react-native";
import { Pressable, IButtonProps, useTheme, useColorModeValue } from "native-base";

const families = {
  MaterialIcons,
  MaterialCommunityIcons,
};

export interface IconProps {
  name?: string;
  icon?: string;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
  family?: keyof typeof families;
  onPress?: IButtonProps["onPress"];
}

const defaultProps: IconProps = {
  family: "MaterialCommunityIcons",
};

export const Icon: React.FunctionComponent<IconProps> = ({ name, icon, family, onPress, ...props }) => {
  const { colors } = useTheme();

  const Component = families[family];

  let cmp = (
    <Component
      size={25}
      name={name ?? icon}
      color={useColorModeValue(colors.primary["500"], colors.primary["400"])}
      {...props}
    />
  );

  if (onPress) {
    cmp = <Pressable onPress={onPress}>{cmp}</Pressable>;
  }

  return cmp;
};

Icon.defaultProps = defaultProps;

export default Icon;
