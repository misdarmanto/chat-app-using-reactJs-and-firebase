import React from "react";
import { auth } from "../../lib/configs/firebase";
import "./style.css"

export function ChatMessage({ message, uid, photoURL }) {
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  return (
    <div className={`message ${messageClass}`}>
      <img
        src={
          photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
        }
      />
      <p>{message}</p>
    </div>
  );
}
