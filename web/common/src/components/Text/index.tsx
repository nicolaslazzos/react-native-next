import React from "react";
import { StyleSheet } from "react-native";
import { Text as NText, ITextProps } from "native-base";

export interface TextProps extends ITextProps {
  variant?: "heading" | "title" | "subtitle" | "label" | "small" | "caption";
  text?: ITextProps["children"];
  status?: "error" | "success" | "warning";
}

export const Text: React.FC<TextProps> = ({ variant, text, status, ...props }) => {
  return <NText children={text} {...props} style={[variants[variant], props.style]} {...statuses[status]} />;
};

const variants = StyleSheet.create({
  heading: {},
  title: { fontSize: 16, fontWeight: "500" },
  subtitle: { fontSize: 14, fontWeight: "400" },
  label: { fontSize: 14, marginBottom: 8, color: "grey" },
  small: { fontSize: 13 },
  caption: { fontSize: 13, color: "grey" },
});

const statuses = {
  error: { color: "red.500" },
  success: { color: "green.500" },
  warning: { color: "yellow.500" },
};

export default Text;
