"use client";

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/app/components/layout/layout";
import { SessionProvider } from "next-auth/react";
import JobDetailPage from "../components/jobDetail/jobDetail";

const SignInPage = () => {
  return (
    <ChakraProvider>
      <SessionProvider>
        <Layout>
          <JobDetailPage />
        </Layout>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default SignInPage;
