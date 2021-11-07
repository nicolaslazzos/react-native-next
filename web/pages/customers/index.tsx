import React from "react";
import { View, ScrollView } from "react-native";

import { Button } from "@common/components";

import { useNavigation } from "@common/navigation";

export const Page: React.FC = () => {
  const { navigation, focused } = useNavigation();

  React.useEffect(() => {
    console.log("Focus Changed:", focused);
  }, [focused]);

  return (
    <ScrollView>
      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: "row-reverse", marginBottom: 15 }}>
          <Button text="Nuevo" onPress={() => navigation.navigate("new")} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Page;
