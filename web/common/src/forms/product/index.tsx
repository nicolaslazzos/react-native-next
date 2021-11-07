import React from "react";
import * as Yup from "yup";

import { Form } from "@common/components";
import { CustomFormProps } from "../interfaces";

export const ProductForm: React.FC<CustomFormProps> = (props) => {
  const { data, onSuccess, onError } = props;

  const onSubmit = async (body: any) => {
    console.log(body);
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={data}
      fields={[
        {
          name: "name",
          type: "text",
          value: "",
          placeholder: "Mi Producto",
          label: "Nombre",
          validations: Yup.string().required("Debe ingresar un nombre."),
        },
        {
          name: "description",
          type: "text",
          value: "",
          placeholder: "Esto es una descripción",
          label: "Descripción",
        },
      ]}
      actions={[{ text: "Guardar", action: "submit", name: "submit" }]}
    />
  );
};

ProductForm.defaultProps = {
  data: {},
};
