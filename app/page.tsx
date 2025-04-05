"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import LoadingScreen from "@/components/molecules/LoadingScreen";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/main");
      } else {
        router.replace("/login");
      }
    }
  }, [user, loading, router]);

  return <LoadingScreen />;
}
