"use client";

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/app/components/layout/layout";
import { SessionProvider } from "next-auth/react";
import SigninForm from "../components/signin/signin";

const SignInPage = () => {
  return (
    <ChakraProvider>
      <SessionProvider>
        <Layout>
          <SigninForm />
        </Layout>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default SignInPage;
