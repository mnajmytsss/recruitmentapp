import { InputProps } from "@chakra-ui/react";
import { ChangeEvent } from "react";

export interface UserInterface extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  picture?: string;
  biodata?: {
    bio?: string;
    alamat?: string;
    pendidikan?: string;
    pengalamanKerja?: string;
    cv?: string;
    suratLamaran?: string;
    portfolio?: string;
  };
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionData {
  user: {
    _id: string;
    name: string | null | undefined;
    email: string | null | undefined;
  } | null | undefined;
  expires: string;
}


export interface ApplicationStatusProps {
  jobTitle: string;
  status:
    | "pending"
    | "interview_hr"
    | "interview_user"
    | "offering"
    | "rejected"
    | "not_continued";
}

export interface CareerInterface {
  _id: string;
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

export interface UserStore {
  user: UserInterface;
  setUser: (user: UserInterface) => void;
  toggleShowPassword: () => void;
  showPassword: boolean;
}

export interface AuthStore {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export interface Pekerjaan {
  id: number;
  nama: string;
  deskripsi: string;
  kualifikasi: string;
}
