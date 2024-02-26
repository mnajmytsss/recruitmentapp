"use client";

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/app/components/layout/layout";
import { SessionProvider, useSession } from "next-auth/react";
import Profile from "../components/profile/profile";

const ProfilePage = () => {
  return (
    <ChakraProvider>
      <SessionProvider>
        <Layout>
          <ProfileWrapper />
        </Layout>
      </SessionProvider>
    </ChakraProvider>
  );
};

const ProfileWrapper = () => {
  const { data: session, status } = useSession();
  console.log("Session:", session);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return session ? (
    <Profile
    />
  ) : (
    <div>Not signed in</div>
  );
};

export default ProfilePage;
