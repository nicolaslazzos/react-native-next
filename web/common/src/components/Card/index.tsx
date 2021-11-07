import React from "react";
import { Container, Stack, IBoxProps } from "native-base";

export interface CardProps extends IBoxProps {
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <Container shadow={4} rounded="lg" marginBottom={4} overflow="hidden" p={4} {...props}>
      <Stack space={1} w="100%">
        {children}
      </Stack>
    </Container>
  );
};
