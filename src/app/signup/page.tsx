"use client";

import React from "react";
import RegisterForm from "@/app/components/signup/signup";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/app/components/layout/layout";
import { SessionProvider } from "next-auth/react";

const SignUpPage = () => {
  return (
    <ChakraProvider>
      <SessionProvider>
        <Layout>
          <RegisterForm />
        </Layout>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default SignUpPage;
