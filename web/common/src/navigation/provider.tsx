import React from "react";
import { Platform } from "react-native";

import { navigation } from "@common/navigation/navigator";

export const prefix = Platform.select({ web: "http://localhost:3000", default: "" });

export interface NavigationContextType {
  navigation: any;
  screen: any;
  focused: boolean;
}

export const NavigationContext = React.createContext<Partial<NavigationContextType>>({});

export const useNavigation = () => React.useContext(NavigationContext);

export interface NavigationProviderProps {
  router: any;
  screen: any;
}

export const NavigationProvider: React.FunctionComponent<NavigationProviderProps> = ({ children, router, screen }) => {
  const [focused, setFocused] = React.useState(true);

  React.useEffect(() => {
    if (!focused) setFocused(true);
  }, [focused]);

  React.useEffect(() => {
    let unsubscribe: any;

    if (router) {
      navigation.set({ router, prefix });

      unsubscribe = router?.addListener?.("focus", async () => {
        navigation.set({ router, prefix });

        setFocused(false);
      });
    }

    screen = screen?.current;

    if (screen) screen.navigation = navigation;

    if (unsubscribe) return unsubscribe;
  }, []);

  return (
    <NavigationContext.Provider value={{ navigation, screen: screen?.current, focused }}>
      {children}
    </NavigationContext.Provider>
  );
};
