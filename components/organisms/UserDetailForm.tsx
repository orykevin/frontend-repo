"use client";

import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import FormField from "../molecules/FormField";
import { updateUserDataApi } from "@/apis/userApi";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { AppDispatch, RootState } from "@/store/store";
import { fetchUser, updateUser } from "@/store/userSlice";

type Props = {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserDetailForm = ({ setIsEditing }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [authUser, authLoading] = useAuthState(auth);
  const {
    data: user,
    loading,
    error,
  } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({
    hobby: "",
    address: "",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUser({ userData: formData })).then(() => {
      if (!user) {
        dispatch(fetchUser());
      }
      setIsEditing(false);
    });
  };

  useEffect(() => {
    if (!user && loading === "idle") {
      dispatch(fetchUser());
    }
  }, [user, loading, dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        hobby: user?.hobby || "",
        address: user?.address || "",
        phoneNumber: user?.phoneNumber || "",
      });
    }
  }, [user]);

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormField
          label="Hobby"
          name="hobby"
          helper="Please enter your hobby"
          onChange={handleChange}
          value={formData.hobby}
        />
        <FormField
          label="Address"
          name="address"
          helper="Please enter your Address"
          onChange={handleChange}
          value={formData.address}
        />
        <FormField
          label="Phone Number"
          name="phoneNumber"
          helper="Please enter your Phone number"
          onChange={handleChange}
          value={formData.phoneNumber}
        />
        <Box sx={{ display: "flex", gap: "0.5rem" }} mt={2}>
          <Button type="button" fullWidth onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" fullWidth>
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UserDetailForm;
