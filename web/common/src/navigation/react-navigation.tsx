import React from "react";
import { useWindowDimensions } from "react-native";
import {
  DefaultTheme,
  NavigationContainer,
  NavigationContainerProps,
  getStateFromPath,
} from "@react-navigation/native";
import { createStackNavigator, StackNavigationOptions, TransitionPresets } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from "@react-navigation/drawer";

import { DrawerButton } from "@common/components";

import { NavigationProvider, prefix } from "@common/navigation";

import { ThemeProvider, theme as t } from "@common/theme";

// customers
import Customers from "@common/pages/customers";
import NewCustomer from "@common/pages/customers/new";

// products
import Products from "@common/pages/products";
import NewProduct from "@common/pages/products/new";

const dark = t.colors.dark[100];

interface Stack {
  name: string;
  path: string;
  icon?: string;
  options?: StackNavigationOptions;
  screens?: Stack[];
  Component?: typeof React.Component | React.FC;
}

const Stack = createStackNavigator();

const buildStack = (stack: Stack, props: any) => {
  const screens = stack.screens.map(({ name, options, Component }, index) => {
    return (
      <Stack.Screen key={index} name={name} options={options}>
        {(p) => {
          const { route, navigation } = p;

          p = { ...p, navigation: { ...navigation, route } };

          return (
            <NavigationProvider router={p.navigation} {...props}>
              <Component {...props} navigation={p.navigation} />
            </NavigationProvider>
          );
        }}
      </Stack.Screen>
    );
  });

  return (
    <Stack.Navigator
      initialRouteName={stack.screens[0].name}
      headerMode="screen"
      {...TransitionPresets.SlideFromRightIOS}
      screenOptions={{ headerStyle: { backgroundColor: dark } }}
    >
      {screens}
    </Stack.Navigator>
  );
};

const buildStacks = (stacks: { [key: string]: Stack }) => {
  return Object.values(stacks).map((stack) => {
    stack.Component = (props) => buildStack(stack, props);

    return stack;
  });
};

const buildScreens = (stacks: Stack[]) => {
  return stacks.reduce((sc: { [key: string]: string }, stack) => {
    const screens = stack.screens.reduce((screens: { [key: string]: string }, screen) => {
      screens[screen.name] = stack.path + screen.path;
      return screens;
    }, {});

    return { ...sc, [stack.name]: { screens } };
  }, {});
};

const stacksObj: { [key: string]: Stack } = {
  // Customers Stack
  customers: {
    name: "customers",
    path: "/customers",
    icon: "account-multiple",
    options: { title: "Clientes" },
    screens: [
      {
        name: "main",
        path: "/",
        options: { title: "Clientes" },
        Component: Customers,
      },
      {
        name: "new",
        path: "/new",
        options: { title: "Nuevo Cliente" },
        Component: NewCustomer,
      },
    ],
  },
  // Products Stack
  products: {
    name: "products",
    path: "/products",
    icon: "desktop-classic",
    options: { title: "Productos" },
    screens: [
      {
        name: "main",
        path: "/",
        options: { title: "Productos" },
        Component: Products,
      },
      {
        name: "new",
        path: "/new",
        options: { title: "Nuevo Producto" },
        Component: NewProduct,
      },
    ],
  },
};

// Main Navigation

const stacks: Stack[] = buildStacks(stacksObj);

const Drawer = createDrawerNavigator();

const CustomDrawerContent: React.FC<DrawerContentComponentProps<DrawerContentOptions>> = (props) => {
  const getStack = (name: Stack["name"]) => stacks.find((stack) => stack.name === name);

  return (
    <DrawerContentScrollView {...props}>
      {props.state.routeNames.map((name, index) => {
        const { options, icon, path } = getStack(name);

        const active = index === props.state.index;

        return (
          <DrawerButton
            key={name}
            text={options.title}
            icon={icon}
            active={active}
            onPress={() => {
              if (active) {
                props.navigation.reset(getStateFromPath(path));
              } else {
                props.navigation.navigate(name);
              }
            }}
          />
        );
      })}
    </DrawerContentScrollView>
  );
};

const MainNavigation: React.FC = () => {
  const { width } = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerType={width < 800 ? "front" : "permanent"}
      drawerStyle={{ width: 300, backgroundColor: dark }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName={stacks[0].name}
    >
      {stacks.map(({ name, Component }) => (
        <Drawer.Screen key={name} name={name} component={Component} />
      ))}
    </Drawer.Navigator>
  );
};

export const config = { screens: buildScreens(stacks) };

export const linking = { prefixes: [prefix], config };

export const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: dark,
    border: t.colors.dark[200],
    text: "white",
  },
};

const Root: React.FC<Partial<NavigationContainerProps>> = (props) => {
  const getInitialState = () => {
    let path = "";

    try {
      path = location?.pathname ?? "";
    } catch (e) {}

    const state = getStateFromPath(path);

    return state;
  };

  return (
    <ThemeProvider>
      <NavigationContainer theme={theme} linking={linking} initialState={getInitialState()} {...props}>
        <MainNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default Root;
