// 'use client'
import React from "react";
import { GoogleSignInButton } from "../components/googleAuthButtons/authButtons";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/app/components/layout/layout";

const GoogleAuth = () => {
  return (
    <ChakraProvider>
      <Layout>
        <GoogleSignInButton />
      </Layout>
    </ChakraProvider>
  );
};

export default GoogleAuth;
