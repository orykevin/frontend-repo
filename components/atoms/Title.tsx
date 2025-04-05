import { Theme } from "@emotion/react";
import { SxProps, Typography } from "@mui/material";
import React from "react";

type TitleProps = {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  sx?: SxProps<Theme>;
};

const Title = ({ variant = "h1", children, ...props }: TitleProps) => {
  return (
    <Typography variant={variant} {...props}>
      {children}
    </Typography>
  );
};

export default Title;
