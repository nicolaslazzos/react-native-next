import React from "react";
import { Pressable, IButtonProps, HStack, Icon as NIcon } from "native-base";
import { Text, Icon, IconProps } from "@common/components";

export interface DrawerButtonProps {
  text?: string;
  icon?: string;
  iconProps?: IconProps;
  route?: string;
  active?: boolean;
  onPress?: IButtonProps["onPress"];
}

export const DrawerButton: React.FC<DrawerButtonProps> = (props) => {
  const { text, icon, iconProps, active, onPress } = props;

  return (
    <Pressable px={5} py={3} bg={active ? "primary.400" : "transparent"} onPress={onPress}>
      <HStack space={4} alignItems="center">
        {!!icon && <NIcon size={5} as={<Icon name={icon} {...iconProps} />} color={active ? "black" : "white"} />}
        {!!text && (
          <Text variant="title" color={active ? "black" : "white"}>
            {text}
          </Text>
        )}
      </HStack>
    </Pressable>
  );
};
