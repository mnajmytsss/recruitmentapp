import React from "react";
import { GoogleSignInButton } from "../components/authButtons";
import { ChakraProvider } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

const googleAuth = () => {
  return (
    <ChakraProvider>
      <GoogleSignInButton />
    </ChakraProvider>
  );
};

export default googleAuth;
