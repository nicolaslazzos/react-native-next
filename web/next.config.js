const withTM = require("next-transpile-modules")([
  "react-native-web",
  // react-navigation
  "@react-navigation/native",
  "@react-navigation/drawer",
  "@react-navigation/stack",
  "react-native-iphone-x-helper",
  "react-native-screens",
  "react-native-reanimated",
  // native-base
  "native-base",
  "react-native-svg",
  "styled-components",
  "react-native-safe-area-context",
  "@react-aria/visually-hidden",
  "@react-native-aria/button",
  "@react-native-aria/checkbox",
  "@react-native-aria/combobox",
  "@react-native-aria/focus",
  "@react-native-aria/interactions",
  "@react-native-aria/listbox",
  "@react-native-aria/overlays",
  "@react-native-aria/radio",
  "@react-native-aria/slider",
  "@react-native-aria/tabs",
  "@react-native-aria/utils",
  "@react-stately/combobox",
  "@react-stately/radio",
  // react-native-vector-icons
  "react-native-vector-icons",
]);

const withImages = require("next-images");

module.exports = withTM(
  withImages({
    webpack: (config) => {
      config.resolve.extensions = [
        ".web.ts",
        ".web.tsx",
        ".web.js",
        ".web.jsx",
        ".ts",
        ".tsx",
        ".js",
        ".jsx",
        ...config.resolve.extensions,
      ];

      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        "react-native$": "react-native-web",
        "react-native-web/src": "react-native-web/dist",
      };

      return config;
    },
  })
);
