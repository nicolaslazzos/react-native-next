import React from "react";
import { View, StyleSheet } from "react-native";
import { Formik, FormikConfig, FormikProps, FormikValues, FieldArray } from "formik";
import * as Yup from "yup";

import { Button, ButtonProps, Input, Select, SelectProps, Text, Card } from "@common/components";

interface Field {
  name: string;
  type: "text" | "number" | "select" | "autocomplete" | "list" | "action";
  value?: any;
  label?: string;
  description?: string;
  items?: SelectProps["items"];
  fields?: Field[];
  placeholder?: string;
  validations?: any;
  onPress?: (data: any) => any;
}

type Action = ButtonProps & {
  name?: string;
  action?: "submit" | "cancel" | "other";
};

export interface FormProps {
  fields: Field[];
  actions: Action[];
  initialValues?: FormikProps<FormikValues>["initialValues"];
  onSubmit: FormikConfig<FormikValues>["onSubmit"];
}

export const Form: React.FC<FormProps> = ({ onSubmit, initialValues, ...props }) => {
  const [ready, setReady] = React.useState(true);

  React.useEffect(() => {
    setReady(false);
  }, [initialValues]);

  React.useEffect(() => {
    !ready && setReady(true);
  }, [ready]);

  const getInitialValues = () => {
    return props.fields.reduce((values, field) => {
      if (["action"].includes(field.type)) return values;
      return { ...values, [field.name]: initialValues?.[field.name] ?? field.value };
    }, {});
  };

  const getValidationSchema = (fields: Field[]) => {
    const schemas = fields.reduce((schema, field) => {
      if (!field.validations) return { ...schema };
      return { ...schema, [field.name]: field.validations };
    }, {});

    return Yup.object().shape(schemas);
  };

  const renderField = (field: Field, handlers: FormikProps<FormikValues>, index?: number) => {
    const { name, placeholder, label, description, items } = field;
    const { handleChange, handleBlur, values, isSubmitting, isValidating, errors, touched } = handlers;

    const disabled = isValidating || isSubmitting;

    const key = field.name;

    let cmp: React.ReactNode | null = null;

    let error = touched[name] && errors[name] ? `${errors[name]}` : null;

    if (["text", "number"].includes(field.type)) {
      cmp = (
        <Input
          key={key}
          label={label}
          placeholder={placeholder}
          description={description}
          error={error}
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
          value={values[name]}
          disabled={disabled}
        />
      );
    } else if (["select"].includes(field.type)) {
      cmp = (
        <Select
          key={key}
          label={label}
          placeholder={placeholder}
          description={description}
          error={error}
          onValueChange={handleChange(name)}
          items={items}
          defaultValue={values[name]}
          disabled={disabled}
        />
      );
    } else if (["list"].includes(field.type)) {
      cmp = renderArrayField(field, handlers);
    } else if (["action"].includes(field.type)) {
      cmp = <Button key={key} text={label} onPress={() => field?.onPress?.({ index })} style={styles.action} />;
    }

    return cmp;
  };

  const renderArrayField = (field: Field, handlers: FormikProps<FormikValues>) => {
    const { name, label } = field;
    const { values, errors, touched } = handlers;

    let error = touched[name] && errors[name] ? `${errors[name]}` : null;

    return (
      <FieldArray name={name}>
        {({ remove, push }) => {
          return (
            <>
              {!!label && <Text text={label} variant="label" style={{ marginBottom: 16 }} />}
              {values?.[name]?.map((_, index: number) => {
                return (
                  <Card p={6} paddingBottom={2}>
                    {field.fields.map((field) => {
                      field = { ...field, name: `${name}.${index}.${field.name}` };

                      return renderField(field, handlers, index);
                    })}
                    <Button text="Eliminar" onPress={() => remove(index)} style={styles.action} />
                  </Card>
                );
              })}
              {!!error && <Text text={error} variant="small" status="error" style={{ marginBottom: 16 }} />}
              <Button
                text="Agregar"
                onPress={() => {
                  const item = field.fields.reduce((res, f) => {
                    if (["action"].includes(f.type)) return res;
                    return { ...res, [f.name]: f.value };
                  }, {});

                  push(item);
                }}
                style={styles.action}
              />
            </>
          );
        }}
      </FieldArray>
    );
  };

  const renderAction = (action: Action, handlers: FormikProps<FormikValues>) => {
    const { action: type, ...props } = action;
    const { handleSubmit, isSubmitting, isValidating } = handlers;

    const loading = isSubmitting || isValidating;

    const key = action.name;

    if (["submit"].includes(type)) {
      return <Button key={key} {...props} loading={loading} onPress={handleSubmit as any} />;
    } else {
      return <Button key={key} {...props} />;
    }
  };

  if (!ready) return null;

  return (
    <View style={styles.root}>
      <Formik
        enableReinitialize
        initialValues={getInitialValues()}
        validationSchema={getValidationSchema(props.fields)}
        onSubmit={onSubmit}
      >
        {(handlers) => (
          <View style={styles.container}>
            {props.fields.map((field) => renderField(field, handlers))}
            {!!props.fields.length && !!props.actions.length && <View style={{ height: 16 }} />}
            {props.actions.map((action) => renderAction(action, handlers))}
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { alignItems: "center" },
  container: { padding: 15, maxWidth: 500, width: "100%" },
  action: { marginBottom: 15 },
});

export default Form;
