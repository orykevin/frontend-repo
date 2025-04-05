import { Theme } from "@emotion/react";
import { Card, CardTypeMap, SxProps } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";
import Title from "../atoms/Title";

type FormCardProps = {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  title: string;
};

const FormCard = ({ children, sx, title }: FormCardProps) => {
  return (
    <Card sx={sx}>
      <Title variant="h5" sx={{ textAlign: "center" }}>
        {title}
      </Title>
      {children}
    </Card>
  );
};

export default FormCard;
