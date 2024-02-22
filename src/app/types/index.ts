import { InputProps } from "@chakra-ui/react";
import { ChangeEvent } from "react";

export interface UserInterface {
  name: string;
  email: string;
  password: string;
  pendidikan: string;
  pengalamanKerja: string;
  cv: string;
  suratLamaran: string;
  picture: string;
}

export interface CareerInterface {
  pekerjaan: string;
  deskripsi: string;
  kualifikasi: string;
  tanggungJawab: string;
  manfaat: string;
}

export interface CustomFormControlProps extends InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  sx: object;
}

export interface FileInputProps {
  label: string;
  accept: string;
  onChange: (file: File) => void;
  sx: object;
}
