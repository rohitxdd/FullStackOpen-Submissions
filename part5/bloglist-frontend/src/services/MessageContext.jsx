import { createContext, useContext, useState } from "react";
import PopupMessage from "../components/PopupMessage";

const MessageContext = createContext();

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("Context not defined");
  }
  return context;
};

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {message && <PopupMessage message={message} />}
      {children}
    </MessageContext.Provider>
  );
};
