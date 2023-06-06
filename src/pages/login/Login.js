import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import firebase from "firebase/app";
import "firebase/auth";
import { auth, storage, fireStore } from "../../fireBaeDateBae/config";

import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const signInWithMicrosoft = () => {
    const provider = new firebase.auth.OAuthProvider("microsoft.com");
    provider.setCustomParameters({
      prompt: "login",
      tenant: "common",
    });
    firebase
      .auth()
      .signInWithRedirect(provider)
      .then(async (result) => {
        console.log("then block!!!!!!!!!!!!!!!!!!!!!!!!!");
        // Handle successful sign-in
        console.log("Signed in user:", result);

        const user = result.user;
        console.log("Signed in user:", user);
        // Perform any necessary logic or redirection after successful sign-in
        await fireStore.collection("users").doc(result.user.uid).set({
          online: true,
          // displayName,
          // photoURL: imgUrl,
        });
      })
      .catch((error) => {
        console.log("then catch block!!!!!!!!!!!!!!!!!!!!!!!!!");

        console.log(error);
        // Handle errors
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles["login-form"]}>
      <h2>login</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isPending && (
        <>
          <button style={{ marginRight: "1rem" }} className="btn">
            Login
          </button>
          <button
            style={{ marginRight: "1rem" }}
            className="btn"
            onClick={signInWithMicrosoft}
          >
            Sign in with Microsoft
          </button>
        </>
      )}
      {isPending && (
        <button className="btn" disabled>
          loading
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}
