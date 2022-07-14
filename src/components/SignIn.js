import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import { Button, Card } from "@mui/material";
import {
  collection,
  limit,
  query,
  orderBy,
  serverTimestamp,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../lib/configs/firebase";

export function SignIn() {

  const signInWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      const userData = {
        name : user.displayName,
        photoUrl : user.photoURL,
      }
      const docRef = doc(db, 'users', user.email)
      setDoc(docRef, userData);

      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error)
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: window.innerHeight,
        backgroundColor: "#f3f3f3"
      }}
    >
      <Card
        sx={{
          minWidth: 300,
          minHeight: 250,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={signInWithGoogle}
          variant="outlined"
          startIcon={<GoogleIcon />}
        >
          Sign in with Google
        </Button>
      </Card>
    </div>
  );
}
