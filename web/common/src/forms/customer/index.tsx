import React from "react";
import * as Yup from "yup";

import { Form } from "@common/components";
import { CustomFormProps } from "../interfaces";

export const CustomerForm: React.FC<CustomFormProps> = (props) => {
  const { data, onSuccess, onError } = props;

  const [states, setStates] = React.useState([]);

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
          placeholder: "Juan Perez",
          label: "Nombre",
          validations: Yup.string().required("Debe ingresar un nombre."),
        },
        {
          name: "address",
          type: "text",
          value: "",
          placeholder: "Calle Falsa 123",
          label: "Dirección",
        },
        {
          name: "city",
          type: "text",
          value: "",
          placeholder: "Córdoba",
          label: "Localidad",
        },
        {
          name: "state",
          type: "select",
          value: "",
          placeholder: "Córdoba",
          label: "Provincia",
          items: states,
        },
      ]}
      actions={[{ text: "Guardar", action: "submit", name: "submit" }]}
    />
  );
};

CustomerForm.defaultProps = {
  data: {},
};
