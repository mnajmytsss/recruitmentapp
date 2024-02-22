import React, { ChangeEvent } from "react";
import { FormControl, Input } from "@chakra-ui/react";
import { FileInputProps } from "@/app/types";

const FileInput: React.FC<FileInputProps> = ({ label, accept, onChange, sx }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      onChange(file);
    }
  };

  return (
    <FormControl sx={sx}>
      <label
        style={{
          fontSize: "16px",
          marginBottom: "8px",
        }}
      >
        {label}
      </label>
      <Input
        type="file"
        accept={accept}
        onChange={handleChange}
        style={{
          width: "360px",
          padding: "10px",
          fontSize: "14px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxSizing: "border-box",
        }}
      />
    </FormControl>
  );
};

export default FileInput;
