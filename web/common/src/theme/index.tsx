import React from "react";
import { NativeBaseProvider, NativeBaseProviderProps, extendTheme, theme as t, themeTools } from "native-base";

export const theme = extendTheme({
  colors: {
    // define your primary color
    primary: { ...t.colors.green },
  },
  config: {
    initialColorMode: "dark",
  },
  components: {
    ModalContent: {
      baseStyle: (props) => {
        return {
          bg: themeTools.mode("white", "dark.100")(props),
        };
      },
    },
    ModalCloseButton: {
      baseStyle: (props) => {
        return {
          _hover: { bg: themeTools.mode("primary.200", "primary.900")(props) },
          _icon: {
            color: themeTools.mode("primary.500", "primary.400")(props),
          },
        };
      },
    },
    IconButton: {
      baseStyle: (props) => {
        return {
          _hover: { bg: themeTools.mode("primary.200", "primary.900")(props) },
          _icon: {
            color: themeTools.mode("primary.500", "primary.400")(props),
          },
        };
      },
    },
    Container: {
      baseStyle: (props) => {
        return {
          bg: themeTools.mode("white", "dark.100")(props),
          borderColor: themeTools.mode("muted.200", "gray.600")(props),
        };
      },
    },
  },
});

export interface ThemeProviderProps extends NativeBaseProviderProps {}

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  return <NativeBaseProvider theme={theme} {...props} />;
};

export default ThemeProvider;
