import React from "react";
import { Button as NButton, Modal } from "native-base";

import { Button, ButtonProps } from "@common/components";

export interface DialogProps {
  title?: string;
  actions?: ButtonProps[];
  children?: React.ReactNode;
}

export const Dialog = React.forwardRef<any, DialogProps>(({ children, title, actions }, ref) => {
  const [visible, setVisible] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => setVisible(false),
    toggle: () => setVisible((prev) => !prev),
  }));

  return (
    <Modal isOpen={visible} onClose={() => setVisible(false)}>
      <Modal.Content maxWidth="600px">
        <Modal.CloseButton onPress={() => setVisible(false)} />
        {!!title && <Modal.Header>{title}</Modal.Header>}
        {!!children && <Modal.Body>{children}</Modal.Body>}
        {!!actions?.length && (
          <Modal.Footer>
            <NButton.Group variant="ghost" space={2}>
              {actions.map((action, index) => (
                <Button key={index} {...action} />
              ))}
            </NButton.Group>
          </Modal.Footer>
        )}
      </Modal.Content>
    </Modal>
  );
});
