import React from "react";
import { View, StyleSheet } from "react-native";

import { Text } from "@common/components";

export interface InputContainerProps {
  label?: string;
  error?: string;
  description?: string;
}

export const InputContainer: React.FC<InputContainerProps> = ({ label, description, error, children }) => {
  return (
    <View style={styles.container}>
      {!!label && <Text text={label} variant="label" />}
      <View style={styles.field}>{children}</View>
      {!!description && <Text variant="caption" text={description} />}
      {!!error && <Text status="error" variant="small" text={error} />}
    </View>
  );
};

const styles = StyleSheet.create({
  field: { marginBottom: 5 },
  container: { marginBottom: 15 },
});
