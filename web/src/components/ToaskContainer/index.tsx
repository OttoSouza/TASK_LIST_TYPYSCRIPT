import React from "react";
import { Container } from "../../styles/toaskcontainer";
import { ToastMessage } from "../../hooks/ToastContext";
import { useTransition } from "react-spring";
import Toast from "./Toast";
interface ToastContainerProps {
  messages: ToastMessage[];
}
const ToaskContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransiction = useTransition(
    messages,
    (message) => message.id,
    {
      from: { left: "-120%" },
      enter: { left: "0%" },
      leave: { left: "-120%" },
    }
  );

  return (
    <Container>
      {messagesWithTransiction.map(({ item, key, props }) => (
        <Toast message={item} key={key} style={props} />
      ))}
    </Container>
  );
};

export default ToaskContainer;
