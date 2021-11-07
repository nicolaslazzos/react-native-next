import React from "react";
import dynamic from "next/dynamic";

// the react-navigation drawer does not work server-side
const MainNavigation = dynamic(() => import("@common/navigation/react-navigation"), { ssr: false });

import "../styles/global.css";

const AppComponent = ({ pageProps }) => {
  return <MainNavigation {...pageProps} />;
};

export default AppComponent;
