import React, { createContext, useCallback, useContext, useState } from "react";
import ToaskContainer from "../components/ToaskContainer";
import { v4 as uuid_v4 } from "uuid";

interface ToastContextData {
  addToast(message: Omit<ToastMessage, "id">): void;
  removeToast(id: string): void;
}

export interface ToastMessage {
  id: string;
  type?: "success" | "error" | "info";
  title: string;
  description?: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, description, title }: Omit<ToastMessage, "id">) => {
      const id = uuid_v4();
      const toast = {
        id,
        type,
        description,
        title,
      };

      setMessages([...messages, toast]);
    },
    [messages]
  );
  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToaskContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser usado com ToastProvider");
  }
  return context;
}

export { useToast, ToastProvider };
