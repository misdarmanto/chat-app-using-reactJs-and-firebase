import React, { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ChatMessage } from "../../components/ChatMessage";
import { db, auth } from "../../lib/configs/firebase";
import {
  collection,
  limit,
  query,
  orderBy,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import "./styles.css";
import { Box, Grid } from "@mui/material";
import Layout from "../../layout";

export function ChatRoom() {
  const messageListRef = useRef();
  const collectionMessagesRef = collection(db, "messages");
  const q = query(collectionMessagesRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData(q, { idField: "id" });
  const [formMessage, setFormMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    await addDoc(collectionMessagesRef, {
      text: formMessage,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });

    setFormMessage("");
    messageListRef.current.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <Layout>
      <Grid container>
        <Grid item xs={12}>
          <main>
            {messages &&
              messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  uid={msg.uid}
                  message={msg.text}
                  photoURL={msg.photoURL}
                />
              ))}
            <span ref={messageListRef}></span>
          </main>
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: `calc(100% - ${240}px)`,
                md: `calc(100% - ${240}px)`,
              },
              position: "fixed",
              bottom: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                border: "1px solid #e3e3e3",
              }}
            >
              <input
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                placeholder="type message..."
                style={{
                  minWidth: "80%",
                  border: "none",
                  borderRadius: "50px",
                  height: "50px",
                  lineHeight: 1.5,
                  outline: "none",
                  padding: "15px",
                  fontSize: "1rem"
                }}
              />

              <button
                className="button-send"
                type="submit"
                disabled={!formMessage}
                onClick={sendMessage}
                style={{ minWidth: "10%" }}
              >
                Send
              </button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}
