import AuthRoute from "@/components/molecules/AuthRoute";
import Dashboard from "@/components/organisms/Dashboard";
import React from "react";

const MainPage = () => {
  return (
    <AuthRoute>
      <Dashboard />
    </AuthRoute>
  );
};

export default MainPage;
