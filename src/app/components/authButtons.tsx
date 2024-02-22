"use client";

import React from "react";
import { Button, Flex, Image } from "@chakra-ui/react";
import googleLogo from "../../../public/google.svg";
import { signIn } from "next-auth/react";

export function GoogleSignInButton() {
  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "http://localhost:3000/pendaftaran" });
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      display="flex"
      alignItems="center"
      fontWeight="semibold"
      justifyContent="center"
      height="14"
      px="6"
      mt="4"
      fontSize="xl"
      transition="background-color 300ms"
      bg="white"
      border="2px solid black"
      color="black"
      borderRadius="lg"
      _focus={{ shadow: "outline" }}
      _hover={{ bg: "slate.200" }}
    >
      <Image src={googleLogo.src} alt="Google Logo" width={10} height={10} />
      <span className="ml-4">Continue with Google</span>
    </Button>
  );
}

export function CredentialsSignInButton() {
  const handleClick = () => {
    signIn();
  };

  return (
    <Button
      onClick={handleClick}
      display="flex"
      alignItems="center"
      fontWeight="semibold"
      justifyContent="center"
      height="14"
      px="6"
      mt="4"
      fontSize="xl"
      transition="background-color 300ms"
      bg="white"
      border="2px solid black"
      color="black"
      borderRadius="lg"
      _focus={{ shadow: "outline" }}
      _hover={{ bg: "slate.200" }}
    >
      <span className="ml-4">Continue with Email</span>
    </Button>
  );
}
