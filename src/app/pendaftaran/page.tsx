"use client";

import React, { ChangeEvent } from "react";
import CustomFormControl from "../components/customFormControl/customFormControl";
import {
  Center,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  ChakraProvider,
} from "@chakra-ui/react";
import styles from "./signup.module.scss";
import { GoEyeClosed } from "react-icons/go";
import { FaRegEye } from "react-icons/fa";
import { useUserStore } from "../store/userStore";
import FileInput from "../components/customFileInput/customFileInput";
import Layout from "../components/layout/layout";

const PendaftaranPage: React.FC = () => {
  const { user, setUser, toggleShowPassword, showPassword } = useUserStore();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleCVChange = (file: File) => {
    // Handle CV file change
    console.log("CV file:", file);
  };

  const handleSuratLamaranChange = (file: File) => {
    // Handle surat lamaran file change
    console.log("Surat lamaran file:", file);
  };

  const handleUserPhotoChange = (file: File) => {
    // Handle user photo file change
    console.log("User photo file:", file);
  };

  return (
    <ChakraProvider>
      <Layout>
      <Center position="relative" className={styles.formContainer}>
        <CustomFormControl
          sx={{ marginBottom: "20px" }}
          label="Full name"
          placeholder="Full name"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <CustomFormControl
          sx={{ marginBottom: "20px" }}
          label="Email"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <FormControl className={styles.formControl}>
          <FormLabel className={styles.formLabel}>Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              className={`${styles.input} ${styles.inputPassword}`}
              onChange={handleChange}
            />
            <InputRightElement className={styles.iconPassword}>
              {" "}
              <IconButton
                aria-label={showPassword ? "Hide password" : "Show password"}
                icon={showPassword ? <GoEyeClosed /> : <FaRegEye />}
                onClick={toggleShowPassword}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <CustomFormControl
          sx={{ marginBottom: "20px" }}
          label="Pendidikan"
          placeholder="Pendidikan"
          name="pendidikan"
          value={user.pendidikan}
          onChange={handleChange}
        />
        <CustomFormControl
          sx={{ marginBottom: "20px" }}
          label="Pengalaman kerja"
          placeholder="Pengalaman kerja"
          name="pengalamanKerja"
          value={user.pengalamanKerja}
          onChange={handleChange}
        />
        <FileInput
          sx={{ marginBottom: "20px" }}
          label="Upload CV (PDF, DOCX)"
          accept=".pdf,.docx"
          onChange={handleCVChange}
        />
        <FileInput
          sx={{ marginBottom: "20px" }}
          label="Upload Surat Lamaran (PDF, DOCX)"
          accept=".pdf,.docx"
          onChange={handleSuratLamaranChange}
        />
        <FileInput
          sx={{ marginBottom: "20px" }}
          label="Upload User Photo (JPG, PNG)"
          accept=".jpg,.png"
          onChange={handleUserPhotoChange}
        />
        <Button colorScheme="teal" size="md" sx={{ w: "360px" }}>
          Submit
        </Button>
      </Center>
      </Layout>
    </ChakraProvider>
  );
};

export default PendaftaranPage;
