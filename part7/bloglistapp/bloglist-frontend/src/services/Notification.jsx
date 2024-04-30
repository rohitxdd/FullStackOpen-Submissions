import PopupMessage from "../components/PopupMessage";
import { useNotification } from "../context/NotificationContext.jsx";

export const Notification = ({ children }) => {
  const { state: notification } = useNotification()
  return (
    <>
      {notification && <PopupMessage message={notification} />}
      {children}
    </>
  );
};
