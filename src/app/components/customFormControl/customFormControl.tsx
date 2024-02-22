import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { CustomFormControlProps } from "@/app/types";

const CustomFormControl: React.FC<CustomFormControlProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  sx
}) => {
  return (
    <FormControl sx={sx}>
      <FormLabel
        style={{
          fontSize: "16px",
          marginBottom: "8px",
        }}
      >
        {label}
      </FormLabel>
      <Input
        placeholder={placeholder}
        style={{
          width: "360px",
          padding: "10px",
          fontSize: "14px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxSizing: "border-box",
        }}
        name={name}
        value={value}
        onChange={onChange}
      />
    </FormControl>
  );
};

export default CustomFormControl;
