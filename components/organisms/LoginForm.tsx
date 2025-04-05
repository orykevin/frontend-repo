"use client";

import React, { useEffect } from "react";
import FormCard from "../molecules/FormCard";
import { Button } from "@mui/material";
import Google from "@/icons/google";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchUserDataApi } from "@/apis/userApi";

const LoginForm = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const handleLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        router.push("/main");
      }
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      router.push("/main");
    }
  }, [user, loading]);

  return (
    <FormCard
      title={"Login"}
      sx={{
        padding: "16px",
        maxWidth: "400px",
        margin: "15% auto",
      }}
    >
      <Button
        variant="contained"
        style={{
          width: "100%",
          display: "flex",
          gap: "8px",
          marginTop: "2rem",
        }}
        onClick={handleLoginGoogle}
        disabled={loading}
      >
        <Google style={{ width: "18px", height: "18px" }} /> Login With Google
      </Button>
    </FormCard>
  );
};

export default LoginForm;
