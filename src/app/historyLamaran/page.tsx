"use client";

import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/app/components/layout/layout";
import { SessionProvider } from "next-auth/react";
import LamaranTable from "../components/historyLamaran/historyLamaran";

const Application = () => {
  return (
    <ChakraProvider>
      <SessionProvider>
        <Layout>
        <LamaranTable />
        </Layout>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default Application;
