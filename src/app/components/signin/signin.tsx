/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });
    if (result && result.error) {
      console.error("Error signing in:", result.error);
      setIsLoading(false);
    } else {
      router.push("/landingPage");
    }
  };

  return (
    <Flex justify="center" align="center" minH="90vh">
      <form>
        <Flex
          direction="column"
          p={8}
          rounded={6}
          boxShadow="lg"
          maxW="400px"
          w="100%"
        >
          <Heading mb={6}>Signin</Heading>
          <FormControl id="email" isRequired mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              width="100%"
            />
          </FormControl>
          <FormControl id="password" isRequired mb={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              width="100%"
            />
          </FormControl>
          <Button
            type="submit"
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            _hover={{
              bg: "pink.300",
            }}
            isLoading={isLoading}
            onClick={handleSignIn}
          >
            Signin
          </Button>
          <Text mt={4} textAlign="center" fontSize="sm" color="gray.600">
            Don't have an account?{" "}
            <Link href="/signup" color={"pink.400"}>
              Register
            </Link>
          </Text>
        </Flex>
      </form>
    </Flex>
  );
};

export default SignInForm;
