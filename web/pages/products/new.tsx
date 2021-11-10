import React from "react";
import { ScrollView } from "native-base";

import { ProductForm } from "@common/forms";
import { useNavigation } from "@common/navigation";

export const Page: React.FC = () => {
  const { navigation } = useNavigation();

  const [data, setData] = React.useState<any>({});

  React.useEffect(() => {
    setData({ ...(navigation.params ?? {}) });
  }, [navigation.params]);

  return (
    <ScrollView>
      <ProductForm data={data} onSuccess={() => navigation.back()} />
    </ScrollView>
  );
};

export default Page;
