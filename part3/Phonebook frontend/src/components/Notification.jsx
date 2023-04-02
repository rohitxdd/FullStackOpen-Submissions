import React from "react";
import "../styles.css"

export default function Notification({ messageObj }) {
  if (messageObj.message) {
    return <div className={messageObj.classStr}>{messageObj.message}</div>;
  }
  return null;
}
