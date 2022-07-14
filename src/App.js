import React from "react";
import "./App.css";

import { auth } from "./lib/configs/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ChatRoom } from "./pages/ChatRoom";
import { SignIn } from "./components/SignIn";

function App() {
  const [user] = useAuthState(auth);
  return user ? <ChatRoom /> : <SignIn />;
}

export default App;
