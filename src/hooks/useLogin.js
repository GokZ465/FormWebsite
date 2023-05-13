import { useState, useEffect } from "react";
import { auth, fireStore } from "../fireBaeDateBae/config";

import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);
    console.log(isCancelled + "should be false");

    try {
      console.log(isCancelled + "1");

      const res = await auth.signInWithEmailAndPassword(email, password);
      console.log(isCancelled + "2");
      await fireStore
        .collection("users")
        .doc(res.user.uid)
        .update({ online: true });

      dispatch({ type: "LOGIN", payload: res.user });
      console.log(isCancelled);
      console.log(isCancelled + "3");

      if (!isCancelled) {
        console.log(isCancelled + "4");
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(false);
  }, []);

  return { login, isPending, error };
};
