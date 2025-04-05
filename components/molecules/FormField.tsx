import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import React from "react";

type FormFieldProps = {
  label: string;
  name: string;
  helper?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

const FormField = ({
  label,
  name,
  helper,
  type = "text",
  value,
  onChange,
}: FormFieldProps) => {
  return (
    <FormControl sx={{ width: "100%", margin: "0.5rem 0" }}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        id={name}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
      />
      {helper && <FormHelperText>{helper}</FormHelperText>}
    </FormControl>
  );
};

export default FormField;
