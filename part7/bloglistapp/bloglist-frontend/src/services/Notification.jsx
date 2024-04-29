import PopupMessage from "../components/PopupMessage";
import { useSelector } from "react-redux";


export const Notification = ({ children }) => {
  const notification = useSelector(state => {
    return state.notification
  })
  console.log(notification)
  return (
    <>
      {notification && <PopupMessage message={notification} />}
      {children}
    </>
  );
};
