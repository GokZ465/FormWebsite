import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import firebase from "firebase/app";
import "firebase/auth";

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
      prompt: "consent",
      tenant: "2260919a-7465-43de-8184-eda9b1cf0a25",
    });
    firebase
      .auth()
      .signInWithRedirect(provider)
      .then((result) => {
        // Handle successful sign-in
        const user = result.user;
        console.log("Signed in user:", user);
        // Perform any necessary logic or redirection after successful sign-in
      })
      .catch((error) => {
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
