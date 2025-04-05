"use client";

import { Avatar, Box, Button, Grid } from "@mui/material";
import React from "react";
import Title from "../atoms/Title";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import UserDetailForm from "./UserDetailForm";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/userSlice";

const Dashboard = () => {
  const dipatch = useDispatch();
  const [isEditing, setIsEditing] = React.useState(false);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dipatch(clearUser());
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div>
      <Grid
        container
        columns={12}
        sx={{ background: "white", padding: "0.25rem 1rem" }}
      >
        <Grid size={10}>
          <Title variant="h6">Main page</Title>
        </Grid>
        <Grid size={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleSignOut}>Logout</Button>
        </Grid>
      </Grid>
      <Box
        sx={{
          maxWidth: "400px",
          margin: "20vh auto",
        }}
      >
        <Box
          sx={{
            display: isEditing ? "none" : "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <Avatar src={user?.photoURL || undefined} />
          <Title variant="h3">{user?.displayName}</Title>
          <Button variant="contained" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        </Box>
        {isEditing && <UserDetailForm setIsEditing={setIsEditing} />}
      </Box>
    </div>
  );
};

export default Dashboard;
